import { base_url } from "./consts";

export type RegisterResponse = {
  token: string;
};

export async function register(
  username: string,
  password: string
): Promise<RegisterResponse | "username-exists-already"> {
  const res = await fetch(`${base_url()}/auth/register`, {
    method: "POST",
    body: JSON.stringify({
      username,
      password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    if (res.status === 409) {
      return "username-exists-already";
    }
    throw Error(await res.text());
  }
  return res.json();
}

export async function login(
  username: string,
  password: string
): Promise<RegisterResponse | null> {
  const res = await fetch(`${base_url()}/auth/login`, {
    method: "POST",
    body: JSON.stringify({
      username,
      password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    if (res.status === 403) {
      return null;
    }
    throw Error(await res.text());
  }
  return res.json();
}
