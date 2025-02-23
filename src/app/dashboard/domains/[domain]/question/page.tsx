import { startOrResumeDomainQuiz } from '@/app/actions/questions'
import { DomainType } from '@prisma/client'
import QuestionsPage from './question-client'
import { redirect } from 'next/navigation'

type Params = Promise<{ domain: string }>
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default async function QuestionsListing({
  params,
  searchParams,
}: {
  params: Params
  searchParams: SearchParams
}) {
  const { domain } = await params
  const capitalizedDomain = domain.toUpperCase()

  if (!capitalizedDomain || !(capitalizedDomain in DomainType)) {
    return <div>Invalid domain</div>
  }

  const response = await startOrResumeDomainQuiz(
    capitalizedDomain as DomainType,
  )
  if (response.error || !response.data) {
    if (response.error === 'Cannot select more than two domains') {
      redirect('/dashboard/domains?error=maxDomains')
    }
    console.error('Error fetching questions:', response.error)
    throw response.error
  }

  if (response.data?.isCompleted) {
    redirect('/dashboard/domains?completed=true')
  }

  if (
    !response.data.questions ||
    !response.data.answers ||
    !response.data.sessionId
  ) {
    console.error('Missing required data in response')
    redirect('/dashboard/domains?error=internalError')
  }

  return (
    <QuestionsPage
      questions={response.data.questions}
      answers={response.data.answers}
      sessionId={response.data.sessionId}
    />
  )
}
