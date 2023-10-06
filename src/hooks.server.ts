import { SvelteKitAuth } from "@auth/sveltekit";
import Auth0 from "@auth/core/providers/auth0";
import {
  AUTH0_CLIENT_ID,
  AUTH0_CLIENT_SECRET,
  AUTH0_ISSUER,
  AUTH_SECRET,
} from "$env/static/private";

export const handle = SvelteKitAuth({
  providers: [
    Auth0({
      clientId: AUTH0_CLIENT_ID,
      clientSecret: AUTH0_CLIENT_SECRET,
      issuer: `https://${AUTH0_ISSUER}/`,
      profile(profile) {
        const payload = {
          // default
          id: profile.sub,
          name: profile.nickname,
          email: profile.email,
          image: profile.picture,

          // custom
          roles: profile["http://your_domain.com/roles"],
          channel: profile["http://your_domain.com/user_metadata/channel"],
          language: profile["http://your_domain.com/user_metadata/language"],
        };

        console.log("payload", payload);
        return payload;
      },
    }),
  ],
  secret: AUTH_SECRET,
  debug: true,
  session: {
    maxAge: 1800, // 30 mins
  },
});
