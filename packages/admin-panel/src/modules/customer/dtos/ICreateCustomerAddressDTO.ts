export interface ICreateCustomerAddressDTO {
  zip_code: string;
  street: string;
  street_number: string;
  street_complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  ddd: string;
  phone: string;
}
