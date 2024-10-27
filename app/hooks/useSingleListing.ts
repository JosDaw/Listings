import {
	collection,
	getDocs,
	limit,
	query,
	QueryConstraint,
} from "firebase/firestore"
import { useEffect, useState } from "react"
import { database } from "../config/firebase"
import { IListing } from "../types"

interface ListingFilter {
	customFilters?: QueryConstraint[] // Array of filters to apply
}

/**
 * Custom hook to fetch a single listing based on filters.
 *
 * @param {ListingFilter} options - Options for customizing the listing filter.
 * @returns {Object} - An object containing the fetched listing, loading state, and error message.
 * @property {IListing | null} listing - The fetched listing or null if no listing was found.
 * @property {boolean} loading - Indicates whether the listing is currently being fetched.
 * @property {string | null} error - The error message, if any, occurred during the fetch.
 */
const useSingleListing = ({ customFilters = [] }: ListingFilter) => {
	const [listing, setListing] = useState<IListing | null>(null)
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		// Only fetch if not already loaded and no error
		if (loading && !listing && !error) {
			const fetchSingleListing = async () => {
				console.log("Fetching single listing...")
				try {
					setLoading(true)

					// Apply filters and limit to fetch only one document
					// const filters: QueryConstraint[] = [...customFilters, limit(1)]
					const filters: QueryConstraint[] = [limit(1)]

					const listingsQuery = query(
						collection(database, "listing"),
						...filters
					)
					const querySnapshot = await getDocs(listingsQuery)

					if (!querySnapshot.empty) {
						// Get the first document from the snapshot
						const doc = querySnapshot.docs[0]
						console.log("🚀 ~ fetchSingleListing ~ doc:", doc)

						setListing({ ...(doc.data() as IListing), id: doc.id })
					} else {
						setListing(null) // No listing found
					}
				} catch (err) {
					console.log("🚀 ~ fetchSingleListing ~ err:", err)
					setError(
						err instanceof Error ? err.message : "Error fetching listing"
					)
				} finally {
					setLoading(false)
				}
			}

			fetchSingleListing()
		}
	}, [customFilters, listing, loading, error])

	return {
		listing,
		loading,
		error,
	}
}

export default useSingleListing
