import useSWR from 'swr'

import { useAuth } from '@/lib/auth'
import EmptyState from '@/components/EmptyState'
import DashboardShell from '@/components/DashboardShell'
import SiteTableSkeleton from '@/components/SiteTableSkeleton'
import fetcher from '@/utils/fetcher'
import SiteTable from '@/components/SiteTable'

const Dashboard = () => {
  const { user } = useAuth()
  const { data, error } = useSWR(user ? ['/api/sites', user.token] : null, fetcher)

  if (!data) {
    return (
      <DashboardShell>
        <SiteTableSkeleton />
      </DashboardShell>
    )
  }

  return (
    <DashboardShell>
      { !!data.sites.length ? <SiteTable sites={data.sites} /> : <EmptyState /> }
    </DashboardShell>
  )
}

export default Dashboard