
//const baseUrl = 'https://www.d1.nl/iou7'
//const baseUrl = 'https://www.d1.nl/ioung/v10'
const baseUrl = 'https://iou.2genio.us/v10/'

export default {
    baseUrl: baseUrl,

    api: {
        avatarUri: "https://iou.2genio.us/avatars/",

        stuffIoweUri: baseUrl + "iouOverview.php",
        stuffOwedToMeUri: baseUrl + "iouOverview.php",
        iouViewUri: baseUrl + "iouView.php",
        iouCUDUri: baseUrl + "iouCUD.php",
        iouClaimCodeCUD: baseUrl + "iouClaimCodeCUD.php",

        changeRequestCUDUri: baseUrl + "iouChangeRequestCUD.php",

        userCUDUri: baseUrl + "userCUD.php",
        userViewUri: baseUrl + "userView.php",
        userLogoutUri: baseUrl + "logout.php",
        userListUri: baseUrl + "userOverview.php",
        registrationUri: baseUrl + "registration.php",
        avatarUploadUri: baseUrl + "userAvatarCUD.php",
        userCredentialCUDUri: baseUrl + "userCredentialCUD.php",
        userRegistrationCUD: baseUrl + "userRegistrationCUD.php",
        loginAndRegistrationUri: baseUrl + "loginAndRegistration.php",
        userRegistrationClaimCodeCUD: baseUrl + "userRegistrationClaimCodeCUD.php",
        userRegistrationEmailAddressVerificationClaimCodeCUD: baseUrl + "userRegistrationEmailAddressVerificationClaimCodeCUD.php",

        dashboardUri: baseUrl + "dashboard.php",

        dictionaryUri: baseUrl + "getDictionary.php",

        logUri: baseUrl + "log.php",
    }
}

