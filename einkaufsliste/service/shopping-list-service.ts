import { baseurl } from "./consts";

export type JoinedList = { id: string; token: string };

export type ShoppingList = {
  name: string;
  id: string;
  products: Product[];
};

export type User = {
  id: string;
  name: string;
};

export type Product = {
  id: string;
  name: string;
  requester: string;
  location: string;
  quantity: string;
  completed: boolean;
};

export type ListCreate = {
  list: ShoppingList;
  user: User;
};

export type ListCreateRes = {
  list: ShoppingList;
  user: UserCreateRes;
};

export type UserCreateRes = {
  user: User;
  token: string;
};

const esc = encodeURIComponent;

async function fetchApi<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${baseurl()}${path}`, options);
  if (!res.ok) {
    throw Error(await res.text());
  }
  return res.json();
}

async function fetchApiAuth<T>(
  token: string,
  path: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(`${baseurl()}${path}`, {
    ...options,
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    throw Error(await res.text());
  }
  return res.json();
}

export async function getList(id: string): Promise<ShoppingList | null> {
  const res = await fetch(`${baseurl()}/shopping-list/${esc(id)}`);
  if (res.status === 404) {
    return null;
  }
  if (!res.ok) {
    throw new Error(await res.text());
  }
  return await res.json();
}

export async function createList(name: string): Promise<ListCreateRes> {
  const list: ListCreate = {
    list: { id: "", name, products: [] },
    user: { id: "", name: "hans" },
  };
  return fetchApi(`/shopping-list`, {
    method: "POST",
    body: JSON.stringify(list),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function joinList(id: string): Promise<UserCreateRes> {
  const user: User = { id: "", name: "hans" };
  return fetchApi(`/shopping-list/${esc(id)}`, {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function addProduct(
  id: string,
  product: Product
): Promise<ShoppingList> {
  return fetchApi(`/shopping-list/${esc(id)}/products`, {
    method: "POST",
    body: JSON.stringify(product),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function editProduct(
  list: JoinedList,
  product: Product
): Promise<ShoppingList> {
  return fetchApiAuth(
    list.token,
    `/shopping-list/${esc(list.id)}/products/${esc(product.id)}`,
    {
      method: "PUT",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}

export async function deleteProduct(
  id: string,
  productId: string
): Promise<ShoppingList> {
  return fetchApi(`/shopping-list/${esc(id)}/products/${esc(productId)}`, {
    method: "DELETE",
  });
}
