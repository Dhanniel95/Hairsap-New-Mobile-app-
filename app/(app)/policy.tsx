import Container from "@/components/Container";
import GoBack from "@/components/GoBack";
import textStyles from "@/styles/textStyles";
import colors from "@/utils/colors";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const PolicyScreen = () => {
	return (
		<Container dark={true} bg="#FFF">
			<GoBack
				bgColor={colors.dark}
				iconColor={colors.white}
				title="Privacy Policy"
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
							<Text
								style={[textStyles.textBold, { fontSize: 16 }]}
							>
								Introduction
							</Text>
							<Text style={styles.text}>
								Your privacy matters to Hairsap (“Hairsap”,“we”,
								or “us”). This privacy policy explains how we
								collect, use, share and protect information
								about our clients and professionals. This
								privacy policy governs your use of the software
								application Hairsap (“Application”) for mobile
								devices that was created by Hairsap.
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
								What information does the Application obtain and
								how is it used?
							</Text>
							<Text style={{ fontFamily: "bold", fontSize: 16 }}>
								User Provided Information
							</Text>
							<Text style={styles.text}>
								The mobile application obtains the information
								you provide when you download and register on
								the mobile application. When you register with
								us and use our mobile application, you generally
								provide (a) your name, phone number or email
								address, password and a FaceID; (b)
								transaction-related information, such as when
								you make purchases, respond to any offers, or
								download or use our applications; (c)
								information you provide us when you contact us
								for help; (d) information you enter into our
								system when using our application, such as
								contact information and project management
								information. We may also use the information you
								provided us to contact you from time to time to
								provide you with important information, required
								notices and marketing promotions. Automatically
								collected information In addition, our mobile
								application may collect certain information
								automatically, including, but not limited to,
								the type of mobile device you use, your mobile
								devices unique device ID, the IP address of your
								mobile device, your mobile operating system, the
								type of mobile Internet browsers you use, and
								information about the way you use our mobile
								application. Does our mobile application collect
								precise real time location information of the
								device? When you visit the mobile application,
								we use GPS technology (or other similar
								technology) to determine your current location
								in order to determine the city you are located
								within and display a location map that helps our
								beauty pros locate you. We will not share your
								current location with other users or partners.
								If you do not want us to use your location for
								the purposes set forth above, you should turn
								off the location service of the mobile
								application located in your account settings or
								in your mobile phone settings and/or within the
								mobile application. Do third parties see and/or
								have access to information obtained by the
								application? No & Yes. Information provided will
								not be shared with third parties except in ways
								that are described in this privacy statement. We
								may disclose users information provided and
								automatically collected information:
							</Text>
						</View>

						<View
							style={{
								marginBottom: 30,
							}}
						>
							<Text style={styles.text}>
								● As required by law, such as to comply with a
								subpoena, or similar legal process;
							</Text>
							<Text style={styles.text}>
								● When we believe in good faith that disclosure
								is necessary to protect our rights, protect your
								safety or the safety of others, investigate
								fraud, or respond to a government request;
							</Text>
							<Text style={styles.text}>
								● With our trusted service providers who work on
								our behalf, do not have an independent use of
								the information we disclose to them, and have
								agreed to adhere to the rules set forth in this
								privacy statement.
							</Text>
							<Text style={styles.text}>
								● If Hairsap is involved in a merger,
								acquisition, or sale of all or a portion of its
								assets, you will be notified via email and/or a
								prominent notice on our web site of any change
								in ownership or uses of this information, as
								well as any choices you may have regarding this
								information.
							</Text>
						</View>
						<View
							style={{
								marginBottom: 30,
							}}
						>
							<Text style={{ fontFamily: "bold", fontSize: 16 }}>
								What are my opt-out rights?
							</Text>
							<Text style={styles.text}>
								You can stop all collection of information by
								the mobile application easily by using the
								deactivation feature or deleting your account,
								this deactivates/deletes your account. Your
								account will be removed but kept for 28 days in
								case you require an activation, after which it
								will be permanently deleted from our system.
								{"\n"}You can also request to opt-out via email,
								at info@hairsap.com
							</Text>
						</View>
						<View
							style={{
								marginBottom: 30,
							}}
						>
							<Text style={{ fontFamily: "bold", fontSize: 16 }}>
								Data Retention Policy, Managing Your Information
							</Text>
							<Text style={styles.text}>
								We will retain users' information provided data
								for as long as you use the application and for a
								reasonable time thereafter. We will retain
								automatically collected information for up to 24
								months and thereafter may store it in aggregate.
								If you'd like us to delete user provided data
								that you have provided via our mobile
								application, please contact us at
								Hairsap@info.com and we will respond in a
								reasonable time. Please note that some or all of
								the user provided data may be required in order
								for the application to function properly.
								Persons Under The Age of 18 The service is not
								intended for persons under 18 years of age, and
								we do not knowingly collect personal information
								from persons under 18 years of age. If we learn
								we have collected or received personal
								information from persons under 18 without
								verification of parental consent, we will delete
								that information. If a parent or guardian
								becomes aware that his or her child has provided
								us with information without their consent, he or
								she should contact us at Hairsap@info.com. We
								will delete such information from our files
								within a reasonable time.
							</Text>
						</View>
						<View
							style={{
								marginBottom: 30,
							}}
						>
							<Text style={{ fontFamily: "bold", fontSize: 16 }}>
								Security
							</Text>
							<Text style={styles.text}>
								We are concerned about safeguarding the
								confidentiality of your information. We provide
								physical, electronic, and procedural safeguards
								to protect information we process and maintain.
								For example, we limit access to this information
								to authorized employees and contractors who need
								to know that information in order to operate,
								develop or improve our mobile application.
								Please be aware that, although we endeavor to
								provide reasonable security for information we
								process and maintain, no security system can
								prevent all potential security breaches.
							</Text>
						</View>
						<View
							style={{
								marginBottom: 30,
							}}
						>
							<Text style={{ fontFamily: "bold", fontSize: 16 }}>
								Changes
							</Text>
							<Text style={styles.text}>
								This privacy policy may be updated from time to
								time for any reason. We will notify you of any
								changes to our privacy policy by posting the new
								privacy policy here and informing via email or
								text message. You are advised to consult this
								privacy policy regularly for any changes, as
								continued use is deemed approval of all changes.
							</Text>
						</View>

						<View
							style={{
								marginBottom: 30,
							}}
						>
							<Text style={{ fontFamily: "bold", fontSize: 16 }}>
								Consent
							</Text>
							<Text style={styles.text}>
								By using our mobile application, you are
								consenting to our processing of your information
								as set forth in this privacy policy now and as
								amended by us. "Processing,” means using cookies
								on a computer/hand held device or using or
								touching information in any way, including, but
								not limited to, collecting, storing, deleting,
								using, combining and disclosing information, all
								of which activities will take place in Nigeria.
								If you reside outside Nigeria your information
								will be transferred, processed and stored there
								under Nigeria privacy standards.
							</Text>
						</View>

						<View
							style={{
								marginBottom: 30,
							}}
						>
							<Text style={{ fontFamily: "bold", fontSize: 16 }}>
								Consultation
							</Text>
							<Text style={styles.text}>
								Hairsap reserves the right to download and
								process users consultation data. Due to conflict
								of interests, Hairsap shall draw references from
								the consultation data between our customers and
								our beauty professionals so as to help us solve
								disputes among both parties.
							</Text>
						</View>

						<View
							style={{
								marginBottom: 30,
							}}
						>
							<Text style={{ fontFamily: "bold", fontSize: 16 }}>
								Contact us
							</Text>
							<Text style={styles.text}>
								If you have any questions regarding privacy
								while using our mobile application, or have
								questions about our practices, please contact us
								via email at info@hairsap.com
							</Text>
						</View>
					</View>
				</ScrollView>
			</View>
		</Container>
	);
};

export default PolicyScreen;

const styles = StyleSheet.create({
	text: {
		color: colors.mediumGray,
		marginTop: 10,
		lineHeight: 20,
		fontFamily: "regular",
		fontSize: 14,
	},
});
