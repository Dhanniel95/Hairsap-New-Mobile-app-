import Container from "@/components/Container";
import GoBack from "@/components/GoBack";
import colors from "@/utils/colors";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const TermsScreen = () => {
	return (
		<Container dark={true} bg="#FFF">
			<GoBack
				bgColor={colors.dark}
				iconColor={colors.white}
				title="Terms of Service"
			/>
			<View
				style={{
					flex: 1,
					paddingHorizontal: "8%",
					paddingVertical: 40,
				}}
			>
				<ScrollView showsVerticalScrollIndicator={false}>
					<View style={{ flex: 1 }}>
						<View
							style={{
								marginBottom: 30,
							}}
						>
							<Text style={{ fontFamily: "bold", fontSize: 16 }}>
								Welcome to HAIRSAP.
							</Text>
							<Text style={styles.text}>
								Hairsap member terms of use (“Agreement”) apply
								to your use as a Hairsap member. Our website
								www.Hairsap.com (the “site”) is operated by
								Hairsap. We provide the site and mobile
								applications (the “Application”) to enhance
								on-demand and in-home beauty service with
								speculated terms, conditions and policies that
								we provide. This agreement shows the legal
								binding terms for your use of the service. In
								agreement to these terms on behalf of yourself
								or the entity that you represent we completely
								and fully acknowledge that you understand fully
								before your usage of our service. You may not
								accept this agreement or use the service if you
								are not at least 18 years old. Our service can
								also be authorized to individuals under 18 only
								if you are the legal guardian of such
								individuals. If you do not accept or agree to
								these agreements, do not access the use of our
								service. Please note that the mobile application
								is intended to be used to facilitate the
								connection of our beauty provider and clients
								for the purposes of arranging in-home beauty
								service.
							</Text>
							<Text style={styles.text}>
								* Hairsap won't be responsible or liable to you
								related to any appointment other than as
								expressly set forth in the agreement.
							</Text>
							<Text style={styles.text}>
								* Clients are required to welcome pros with the
								same FaceID on the mobile application into their
								comfort zone.
							</Text>
							<Text style={styles.text}>
								* Hairsap Pros are required to work on clients
								with the same FaceID, in cases of unforeseen
								circumstances/ situations which requires the Pro
								to attend to a different individual separate
								from the account holder, both parties will be
								responsible for the concluded agreement.
							</Text>
							<Text style={styles.text}>
								* Pros should satisfy themselves with clients'
								accommodation.
							</Text>
							<Text style={styles.text}>
								* Clients should immediately cancel appointments
								if they feel unsafe or uncomfortable with any
								condition relating to the appointment in any way
								following our cancellation policy.
							</Text>
							<Text style={styles.text}>
								* Clients are not allowed to run an offline
								service with our professionals, Hairsap won’t be
								able to intercede when damages occur.
							</Text>
							<Text style={styles.text}>
								* Hairsap application uses GPS locator
								capabilities to identify your current location.
							</Text>
							<Text style={styles.text}>
								* Hairsap requires the use of internet access
								through your mobile device. You are responsible
								for all mobile carrier charges resulting from
								your use of the mobile app.
							</Text>
							<Text style={styles.text}>
								* Our pros are fully responsible for all
								services provided.
							</Text>
						</View>
						<View
							style={{
								marginBottom: 30,
							}}
						>
							<Text style={{ fontFamily: "bold", fontSize: 16 }}>
								Cancellation policy
							</Text>
							<Text style={styles.text}>
								We reserve the right to cancel free promotional
								services at any time for any reason. Hairsap
								does not refund initial deposits for appointment
								booking except our beauty pro couldn't make it
								for your appointment. Clients should make
								themselves available at the chosen appointment
								date and time. Appointment booking will be
								considered void after 24hours of appointment
								date and time if not completed. If Hairsap
								discovers that the user has abused the company's
								policy, Hairsap has the right to immediately,
								without notice and in its sole discretion
								suspend or terminate your account.
							</Text>
						</View>
						<View
							style={{
								marginBottom: 30,
							}}
						>
							<Text style={{ fontFamily: "bold", fontSize: 16 }}>
								Account creation
							</Text>
							<Text style={styles.text}>
								It is compulsory to register for an account in
								order to use our features of service and provide
								certain information about yourself as prompted
								by the registration form. You agree not to
								create a false account or an account on behalf
								of someone other than yourself. You must agree
								not to create more than one account at any given
								time and you may also delete your account at any
								given time. You shall not create an account or
								use our services if you have been previously
								removed by HAIRSAP. Not following this rule may
								lead to the suspension or termination of your
								account.
							</Text>
						</View>
						<View
							style={{
								marginBottom: 30,
							}}
						>
							<Text style={{ fontFamily: "bold", fontSize: 16 }}>
								Account Responsibility
							</Text>
							<Text style={styles.text}>
								You are responsible for maintaining the
								confidentiality of your account login
								information and are fully responsible for all
								activities that occur under your account. You
								should notify us of any unauthorized use of your
								account. We will not be liable for any loss or
								damage arising from your failure to comply with
								the above requirements.
							</Text>
						</View>

						<View
							style={{
								marginBottom: 30,
							}}
						>
							<Text style={{ fontFamily: "bold", fontSize: 16 }}>
								Payment policy
							</Text>
							<Text style={styles.text}>
								Hairsap accepts bank transfer only.
							</Text>
						</View>

						<View
							style={{
								marginBottom: 30,
							}}
						>
							<Text style={{ fontFamily: "bold", fontSize: 16 }}>
								Copyright policy
							</Text>
							<Text style={styles.text}>
								Hairsap is protected by copyright, trademark,
								patent, and other intellectual property laws.
								All content, graphics, text, videos and other
								content made available are provided to Hairsap
								member services. We grant you a non
								transferable, non-exclusive, right to access and
								use the service for your personal use, and a
								non-exclusive, non-transferable right to
								download, install and use a copy of the
								application on a single mobile device or
								computer that you own for personal use. The
								rights granted to you in this agreement are
								subject to the following restrictions.
							</Text>
							<Text style={styles.text}>
								* You will not modify or rebrand any part of the
								service.
							</Text>
							<Text style={styles.text}>
								* You will not access the services in order to
								build a similar or competitive project.
							</Text>
							<Text style={styles.text}>
								* You will not sell, transfer or commercially
								exploit the service.
							</Text>
							<Text style={styles.text}>
								* You will not copy, reproduce, distribute,
								republish, display any of our service or
								features of this brand. All copyright and other
								proprietary notices on any service content must
								be retained on all copies thereof.
							</Text>
						</View>

						<View
							style={{
								marginBottom: 30,
							}}
						>
							<Text style={{ fontFamily: "bold", fontSize: 16 }}>
								Modification
							</Text>
							<Text style={styles.text}>
								We reserve the right, at any time, to modify,
								suspend, or discontinue your access to the
								service with or without notice. Ownership of
								these service You acknowledge that all the
								intellectual property rights, including
								copyrights, patents, trademarks, and trade
								secrets in the service, including the website
								and applications, are owned by us or our
								licensors. The provision of the services does
								not transfer to you any intellectual or property
								rights.
							</Text>
						</View>
						<View
							style={{
								marginBottom: 30,
							}}
						>
							<Text style={{ fontFamily: "bold", fontSize: 16 }}>
								Trademarks
							</Text>
							<Text style={styles.text}>
								Trademarks, Trade names, graphics, logos, and
								other related content used or in connection with
								the services are properties of Hairsap and may
								not be used without our written permission in
								connection with any third party products or
								services. Other trade names, trademarks, service
								marks that may appear on or in their service are
								the property of their respective owners.
							</Text>
						</View>
						<View
							style={{
								marginBottom: 30,
							}}
						>
							<Text style={{ fontFamily: "bold", fontSize: 16 }}>
								User content
							</Text>
							<Text style={styles.text}>
								You agree that your user content does not
								violate the acceptable user policy. User content
								means any and all information and content that a
								user submits to or posts on the service or any
								social networking sites where we have a page or
								presence (SNS Pages). You will own your content
								with the understanding that you agree that we
								may use and reproduce the user content you make
								available on our SNS pages and on the service.
								You assume all risks associated with the use of
								your user content because you alone are
								responsible for your user content not (Hairsap).
								If your user content violates the acceptable
								user policy, we have every right to delete such
								content at any time.
							</Text>
						</View>

						<View
							style={{
								marginBottom: 30,
							}}
						>
							<Text style={{ fontFamily: "bold", fontSize: 16 }}>
								Acceptable user policy
							</Text>
							<Text style={styles.text}>
								You agree not to use the service to collect,
								upload, transmit any user content that violate
								any third party right, including any copyright,
								trademark, privacy right, or any intellectual
								property or property right. You agree not to use
								this service for unlawful, harassing, abusive,
								threatening, harmful, pornographic, promote
								racism/tribalism, hatred against any group or
								individual. You agree not to send unauthorized
								advertising, promotional materials. We have the
								right to review any user content, investigate or
								take appropriate action against you if you
								violated the acceptable use policy or any other
								provision of this agreement.
							</Text>
						</View>
						<View
							style={{
								marginBottom: 30,
							}}
						>
							<Text style={{ fontFamily: "bold", fontSize: 16 }}>
								Feedback
							</Text>
							<Text style={styles.text}>
								All feedback or suggestions regarding our
								service that will be channeled to us are
								transferable, sub licensable, worldwide license
								to all rights to the feedback provided to us. We
								will treat all feedback given to us and any
								related information as non-confidential. NOTE
								Hairsap does not conduct criminal investigation
								background checks on its customers or evaluate
								the credentials of customers. Hairsap makes no
								warranties as to the conduct of users,
								conditions or accommodation for receiving or
								providing services. Hairsap reserves the right
								to conduct any criminal background check at any
								time using available public records.
							</Text>
						</View>
						<View
							style={{
								marginBottom: 30,
							}}
						>
							<Text
								style={{
									fontFamily: "bold",
									fontSize: 16,
									marginBottom: 20,
								}}
							>
								Disclaimers
							</Text>

							<Text style={{ fontFamily: "bold", fontSize: 16 }}>
								Limitation on Liability
							</Text>
							<Text style={styles.text}>
								As Permitted by the Law, in no circumstances
								will Hairsap “we” be responsible for any damage,
								loses or incidence arising from or relating to
								this agreement or your use of, or inability to
								use, the service, even if we have been advised
								of the possibility of such damages. Access and
								use of the service are at your own risk, and
								will be solely responsible for any damage to
								your computer system or otherwise, or loss data
								resulting therefrom.
							</Text>
						</View>
						<View
							style={{
								marginBottom: 30,
							}}
						>
							<Text style={{ fontFamily: "bold", fontSize: 16 }}>
								Changes to Agreement
							</Text>
							<Text style={styles.text}>
								Hairsap is responsible for keeping our users
								updated to new updates incurred by the brand,
								and if we make any material changes, we may
								notify you by sending e-mail, text message or
								through our social media platform. Any changes
								made will be effective after posting. Continued
								use of our services following notice of such
								changes will indicate your agreement by our
								terms and conditions. Notice. Hairsap requires
								that you provide an email address, a valid phone
								number or follow us on our social media to help
								enhance user communication with the brand.
								Entire agreement Hairsap believes that you’ve
								gone through the company policy and have agreed
								to constitute the entire agreement between you
								and us. If for any reason the agreement is
								breached, Hairsap has every right to take the
								necessary measures to terminate, investigate or
								prosecute such individuals or entities.
							</Text>
						</View>
					</View>
				</ScrollView>
			</View>
		</Container>
	);
};

export default TermsScreen;

const styles = StyleSheet.create({
	text: {
		color: colors.mediumGray,
		marginTop: 10,
		lineHeight: 20,
		fontFamily: "regular",
		fontSize: 14,
	},
});
