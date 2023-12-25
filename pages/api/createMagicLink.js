import * as stytch from 'stytch';

const stytchClient = new stytch.Client({
  project_id: "project-test-cdc40567-3409-4bcf-b27f-f35b920c224c",
  secret: "secret-test-qBd5SmYeO4Atv53XpH2Mg70TNNZDgQBdH90=",
  env: stytch.envs.test,
});

export default async (req, res) => {
  if (req.method === "POST") {
    console.log("req body: ", req.body)
    // const data = JSON.parse(req.body);
    // console.log("data: ", data)
    const email = req.body.email
    

    try {
      const response = await stytchClient.magicLinks.email.loginOrCreate({
        email: email,
        login_magic_link_url: 'http://localhost:3000/api/authenticate',
      login_expiration_minutes: 60,
      });

      res.status(200).json(response);
    } catch (error) {
      console.error("Stytch error:", error);
      res.status(500).json({ error: "Stytch magic link creation failed" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};
