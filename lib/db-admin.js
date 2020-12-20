import { db } from '@/lib/firebase-admin'
import { compareDesc } from 'date-fns'

export const getAllFeedback = async (siteId) => {
  try {
    const snapshot = await db
      .collection('feedback')
      .where('siteId', '==', siteId)
      .get()
    const feedback = []

    snapshot.forEach((doc) => {
      feedback.push({ id: doc.id, ...doc.data() })
    })

    feedback.sort((a, b) => compareDesc(a.createdAt, b.createdAt))

    return { feedback }
  } catch (error) {
    return { error }
  }
}

export const getUserSites = async (userId) => {
  const snapshot = await db
    .collection('sites')
    .where('authorId', '==', userId)
    .get()
  const sites = []

  snapshot.forEach((doc) => {
    sites.push({ id: doc.id, ...doc.data() })
  })

  return sites
}

export const getAllSites = async () => {
  const snapshot = await db
    .collection('sites')
    .get()
  const sites = []

  snapshot.forEach((doc) => {
    sites.push({ id: doc.id, ...doc.data() })
  })

  return sites
}
