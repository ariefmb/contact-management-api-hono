export type AddressCreateRequest = {
  id: string
  title: string
  street: string | null
  city: string | null
  province: string | null
  country: string
  postal_code: string
  contact_id: string
}

export type AddressResponse = {
  id: string
  title: string
  street: string | null
  city: string | null
  province: string | null
  country: string
  postal_code: string
}

export type AddressUpdateRequest = {
  title: string
  street: string
  city: string
  province: string
  country: string
  postal_code: string
}
