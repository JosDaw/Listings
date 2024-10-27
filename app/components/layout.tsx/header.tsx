import useFilter from "@/app/store/useFilter"
import { Ionicons } from "@expo/vector-icons"
import React, { useState } from "react"
import {
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native"
import Modal from "react-native-modal"
import Checkbox from "../common/checkbox"
import RoundedButton from "../common/rounded-button"
import RoundedInput from "../common/rounded-input"

// TODO: change some of these to dropdowns

export default function Header() {
	const [isModalVisible, setIsModalVisible] = useState<boolean>(false)

	const { filter, updateFilter } = useFilter()

	const handleToggleModal = () => {
		setIsModalVisible(!isModalVisible)
	}

	return (
		<>
			<View style={styles.headerContainer}>
				<Text style={styles.headerText}>listings.</Text>
				<TouchableOpacity
					style={styles.iconContainer}
					onPress={() => setIsModalVisible(true)}
				>
					<Ionicons name="options-outline" size={35} color="#1E2E2E" />
				</TouchableOpacity>
			</View>
			<Modal
				isVisible={isModalVisible}
				onBackdropPress={handleToggleModal}
				style={styles.modal}
				swipeDirection="down"
				onSwipeComplete={handleToggleModal}
			>
				<ScrollView>
					<View style={styles.modalContent}>
						<Text style={styles.title}>Settings</Text>

						<Text style={styles.inputTitle}>Location</Text>
						<RoundedInput
							placeholder="Location"
							secureTextEntry={false}
							value={filter.location}
							onChangeText={(text) => {
								updateFilter({ ...filter, location: text })
							}}
						/>

						<Text style={styles.inputTitle}>Home Type</Text>
						<RoundedInput
							placeholder="Home Type"
							secureTextEntry={false}
							value={filter.homeType}
							onChangeText={(text) => {
								updateFilter({ ...filter, homeType: text })
							}}
						/>

						<Text style={styles.inputTitle}>Bedrooms</Text>
						<RoundedInput
							placeholder="Bedrooms"
							secureTextEntry={false}
							value={filter.bedrooms?.toString()}
							onChangeText={(text) => {
								updateFilter({ ...filter, bedrooms: Number(text) })
							}}
						/>

						<Text style={styles.inputTitle}>Bathrooms</Text>
						<RoundedInput
							placeholder="Bathrooms"
							secureTextEntry={false}
							value={filter.bathrooms?.toString()}
							onChangeText={(text) => {
								updateFilter({ ...filter, bathrooms: Number(text) })
							}}
						/>

						<Text style={styles.inputTitle}>Min Cost</Text>
						<RoundedInput
							placeholder="Min Cost"
							secureTextEntry={false}
							value={filter.minCost?.toString()}
							onChangeText={(text) => {
								updateFilter({ ...filter, minCost: Number(text) })
							}}
						/>

						<Text style={styles.inputTitle}>Max Cost</Text>
						<RoundedInput
							placeholder="Max Cost"
							secureTextEntry={false}
							value={filter.maxCost?.toString()}
							onChangeText={(text) => {
								updateFilter({ ...filter, maxCost: Number(text) })
							}}
						/>

						<Text style={styles.inputTitle}>Floors</Text>
						<RoundedInput
							placeholder="Floors"
							secureTextEntry={false}
							value={filter.floors?.toString()}
							onChangeText={(text) => {
								updateFilter({ ...filter, floors: Number(text) })
							}}
						/>

						<Text style={styles.inputTitle}>Min Square Footage</Text>
						<RoundedInput
							placeholder="Min Square Footage"
							secureTextEntry={false}
							value={filter.minSquareFootage?.toString()}
							onChangeText={(text) => {
								updateFilter({ ...filter, minSquareFootage: Number(text) })
							}}
						/>

						<Text style={styles.title}>Amenities & Other</Text>

						<View
							style={{
								flexDirection: "column",
								alignItems: "flex-start",
								gap: 8,
							}}
						>
							<Checkbox
								checked={filter.laundry}
								onChange={() => {
									updateFilter({ ...filter, laundry: !filter.laundry })
								}}
								label={<Text style={styles.checkboxText}>Laundry Room</Text>}
							/>

							<Checkbox
								checked={filter.pool}
								onChange={() => {
									updateFilter({ ...filter, pool: !filter.pool })
								}}
								label={<Text style={styles.checkboxText}>Pool</Text>}
							/>

							<Checkbox
								checked={filter.porch}
								onChange={() => {
									updateFilter({ ...filter, porch: !filter.porch })
								}}
								label={<Text style={styles.checkboxText}>Porch</Text>}
							/>

							<Checkbox
								checked={filter.backyard}
								onChange={() => {
									updateFilter({ ...filter, backyard: !filter.backyard })
								}}
								label={<Text style={styles.checkboxText}>Backyard</Text>}
							/>

							<Checkbox
								checked={filter.fireplace}
								onChange={() => {
									updateFilter({ ...filter, fireplace: !filter.fireplace })
								}}
								label={<Text style={styles.checkboxText}>Fireplace</Text>}
							/>

							<Checkbox
								checked={filter.garage}
								onChange={() => {
									updateFilter({ ...filter, garage: !filter.garage })
								}}
								label={<Text style={styles.checkboxText}>Garage</Text>}
							/>

							<Checkbox
								checked={filter.HOA}
								onChange={() => {
									updateFilter({ ...filter, HOA: !filter.HOA })
								}}
								label={<Text style={styles.checkboxText}>HOA</Text>}
							/>

							<Checkbox
								checked={filter.elevator}
								onChange={() => {
									updateFilter({ ...filter, elevator: !filter.elevator })
								}}
								label={<Text style={styles.checkboxText}>Elevator</Text>}
							/>

							<Checkbox
								checked={filter.wheelchairAccessible}
								onChange={() => {
									updateFilter({
										...filter,
										wheelchairAccessible: !filter.wheelchairAccessible,
									})
								}}
								label={
									<Text style={styles.checkboxText}>Wheelchair Accessible</Text>
								}
							/>
						</View>

						<RoundedButton
							title="Save Settings"
							color="yellow"
							onPress={handleToggleModal}
						/>
					</View>
				</ScrollView>
			</Modal>
		</>
	)
}

const styles = StyleSheet.create({
	headerContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		padding: 16,
		backgroundColor: "#B9D9C3",
		borderBottomWidth: 4,
		borderColor: "#EBA743",
	},
	headerText: {
		fontSize: 24,
		fontWeight: "bold",
		color: "#1E2E2E",
		fontFamily: "serif",
	},
	iconContainer: {
		padding: 8,
	},
	modal: {
		justifyContent: "flex-end",
		margin: 0,
	},
	modalContent: {
		backgroundColor: "#15392F",
		padding: 20,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		alignItems: "center",
		justifyContent: "center",
	},
	title: {
		fontSize: 30,
		marginBottom: 20,
		color: "#FFF",
		fontFamily: "Exo2_400Regular",
		textAlign: "center",
	},
	inputTitle: {
		fontSize: 20,
		color: "#FFF",
		fontFamily: "Exo2_400Regular",
		textAlign: "center",
	},
	checkboxText: {
		fontSize: 18,
		color: "#FFF",
		fontFamily: "Exo2_400Regular",
		textAlign: "center",
	},
})
