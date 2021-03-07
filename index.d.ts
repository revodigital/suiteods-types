export = Ods;
export as namespace Ods;

declare namespace Ods {

  type IdType = 'Carta Identità' | 'Passaporto' | 'Patente'

  enum Roles {
    BASE,
    STUDENT,
    BUSINESS,
    INSTRUCTOR,
    ADMIN
  }

  enum ODSModules {
    OPERATORI = 'Operatori',
    DRONI = 'Droni',
    SCUOLA = 'Scuola'
  }

  interface Address {
    street: string;
    city: string;
    province: string;
    CAP: string;
  }

  interface Credentials {
    email: string;
    password: string;
  }

  interface DomainObject {
    _id: string;
    owner?: string;
  }

  interface AuthEntity extends DomainObject {
    email: string;
    password: string;
    role: Roles;
    instanceId: string;
  }

  interface LoggedEntity {
    authEntity: AuthEntity;
    baseUser: BaseUser;
  }

  interface BaseUser extends DomainObject {
    firstName: string;
    lastName: string;
    phone: string;
    address: Address;
    activeModules: ODSModules[];
  }

  export interface Business extends DomainObject {
    businessName: string;
    pIva: string;
    tel: string;
    pec: string;
    recipientCode: string;
    addressId: string;
    roleId?: string;
  }

  export interface Instructor extends BaseUser {
    licenseCode: string;
  }

  export interface School extends Business {
    cApr: number;
  }

  export interface Student extends BaseUser {
    stateIssuedIdNumber: string;
    stateIssuedIsType: IdType;
    job: string;
    businessId?: string;
  }
}