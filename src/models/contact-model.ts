export type ContactAddRequest = {
  id: string
  first_name: string
  last_name: string | null
  email: string | null
  phone: string | null
  user_id: string
}

export type ContactResponse = {
  id: string
  first_name: string
  last_name: string | null
  email: string | null
  phone: string | null
}

export type ContactUpdateRequest = {
  first_name: string
  last_name: string
  email: string
  phone: string
}

export type ContactSearchRequest = {
  name: string | null
  email: string | null
  phone: string | null
  page: number
  size: number
}

export type Contact = {
  id: string
  first_name: string
  last_name: string
  email: string
  phone: string
}
