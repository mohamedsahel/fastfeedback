import { getUserSites } from '@/lib/db-admin'

export default async (req, res) => {
  const siteId = req.query.siteId
  const { feedback, error } = await getUserSites(siteId)

  if(error) {
    res.status(500).json({ error })
  } else {
    res.status(200).json({ feedback })
  }
}