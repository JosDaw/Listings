import { database } from "@/app/config/firebase"
import useUser from "@/app/store/useUser"
import { IListing } from "@/app/types"
import { showToast } from "@/app/utils/common"
import { addDoc, collection, doc, Timestamp } from "firebase/firestore"
import React from "react"
import { Animated, Image, StyleSheet, Text, View } from "react-native"
import { PanGestureHandler, State } from "react-native-gesture-handler"

interface ListingCardProps {
	listing: IListing
	onSwipeLeft: (listing: IListing) => void
	onSwipeRight: (listing: IListing) => void
}

export default function ListingCard({
	listing,
	onSwipeLeft,
	onSwipeRight,
}: ListingCardProps) {
	const translateX = new Animated.Value(0)

	const onGestureEvent = Animated.event(
		[{ nativeEvent: { translationX: translateX } }],
		{ useNativeDriver: true }
	)

	/**
	 * Handle swiping gesture
	 * @param event
	 */
	const onHandlerStateChange = (event: any) => {
		if (event.nativeEvent.state === State.END) {
			const swipeDistance = event.nativeEvent.translationX

			if (swipeDistance > 100) {
				onSwipeLeft(listing)
			} else if (swipeDistance < -100) {
				onSwipeRight(listing)
			}

			// Reset position
			Animated.spring(translateX, {
				toValue: 0,
				useNativeDriver: true,
			}).start()
		}
	}

	return (
		<PanGestureHandler
			onGestureEvent={onGestureEvent}
			onHandlerStateChange={onHandlerStateChange}
		>
			<Animated.View style={[styles.card, { transform: [{ translateX }] }]}>
				<Image source={{ uri: listing.images[0] }} style={styles.image} />
				<View style={styles.textContainer}>
					<Text style={styles.title}>{listing.title}</Text>
					<Text style={styles.description}>{listing.description}</Text>
				</View>
			</Animated.View>
		</PanGestureHandler>
	)
}

const styles = StyleSheet.create({
	card: {
		borderWidth: 3,
		borderColor: "#BEDBBE",
		borderRadius: 10,
		padding: 10,
		alignItems: "center",
		backgroundColor: "white",
		marginVertical: 10,
	},
	image: {
		width: 350,
		height: 250,
		resizeMode: "contain",
	},
	textContainer: {
		marginTop: 10,
		width: "80%",
	},
	title: {
		fontSize: 18,
		textAlign: "center",
		color: "#2D423D",
		lineHeight: 20,
		fontFamily: "Exo2_400Regular",
	},
	description: {
		fontSize: 14,
		textAlign: "left",
		color: "#2D423D",
		lineHeight: 20,
		fontFamily: "Exo2_400Regular",
	},
})
