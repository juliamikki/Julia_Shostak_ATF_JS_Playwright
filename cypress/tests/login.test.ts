//import envEasyRPA from 

describe("EasyRPA Login Feature", () => {
  let loginScreen: LoginScreen;
  let homeScreen: HomeScreen;

  beforeEach(async () => {
    loginScreen = new LoginScreen();
    homeScreen = new HomeScreen();
    loginScreen.goToBaseUrl(envEasyRPA.baseUrl);
  });

  it("shows error for invalid credentials",  () => {
    loginScreen.loginWithCreds("wrong user", "wrong password");
    loginScreen.errorMessage.should("have.text", "Invalid credentials for user");
  });

  it("redirects to home screen on valid credentials", async () => {
    loginScreen.loginWithCreds(envEasyRPA.credentials.username, envEasyRPA.credentials.password);
    homeScreen.mainHeader().should("have.text", "EasyRPA Control Server");
  });
});
