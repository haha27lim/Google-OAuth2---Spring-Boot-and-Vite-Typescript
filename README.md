To add Google OAuth2 to the project (Spring Boot + Vite + Typescript), you need to add:

Backend:
# pom.xml:
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-oauth2-client</artifactId>
		</dependency>

# WebSecurityConfig.java:

add this on public SecurityFilterChain filterChain(HttpSecurity http) throws Exception: 
        .authorizeHttpRequests(auth -> auth
            .requestMatchers("/api/auth/**", "/oauth2/**", "/login/oauth2/code/google").permitAll()


        .oauth2Login(oauth2 -> oauth2
            .loginPage("/login")
            .defaultSuccessUrl("/api/auth/oauth2/success")
            .failureUrl("/api/auth/oauth2/failure"));

# Application.properties:

spring.security.oauth2.client.registration.google.client-id=${GOOGLE_CLIENT_ID}
spring.security.oauth2.client.registration.google.client-secret=${GOOGLE_CLIENT_SECRET}
spring.security.oauth2.client.registration.google.scope=email,profile


Frontend (Vite + Typescript):

# .env:

VITE_API_URL=http://localhost:8080


# public/google-icon.svg:

- Add Google icon svg file to the public folder.


# Login.tsx:

  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_APP_API_URL}/oauth2/authorization/google`;
  };

              <div className="form-group">
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="google-login-button"
                >
                  <img
                    src="/google-icon.svg"
                    alt="Google"
                    className="google-icon"
                  />
                  Sign in with Google
                </button>
              </div>

              <div className="or-login-with">Or login with</div>


# Register.tsx:

const [isGoogleRedirect, setIsGoogleRedirect] = useState<boolean>(false);

const handleGoogleSignup = () => {
    setIsGoogleRedirect(true);
    window.location.href = `${import.meta.env.VITE_APP_API_URL}/oauth2/authorization/google`;
};


  useEffect(() => {
    const handlePopState = () => {
      setIsGoogleRedirect(false);
    };
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

                    <div className="form-group">
                    <button
                      type="button"
                      onClick={handleGoogleSignup}
                      className="google-login-button"
                    >
                      <img
                        src="/google-icon.svg"
                        alt="Google"
                        className="google-icon"
                      />
                      Sign up with Google
                    </button>
                  </div>
                  <div className="or-login-with">Or sign up with</div>