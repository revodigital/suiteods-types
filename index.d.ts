export = Ods;
export as namespace Ods;

declare namespace Ods {

  type IdType = 'CARTA_ID' | 'PASSAPORTO' | 'PATENTE'

  type ODSModule = 'SCUOLA' | 'OPERATORI' | 'DRONI' | 'ODS_ROOT'

  type ODSEntityType = 'SCHOOL' | 'USER' | 'STUDENT' | 'QUIZ_QUESTION' |
    'QUESTION_SUBJECT' | 'QUIZ_RESULT' | 'COURSE' | 'INSTRUCTOR' | 'LESSON' | 'ENROLLMENT' | 'BUSINESSblish '

  type Role = 'BASE' | 'STUDENTE' | 'ISTRUTTORE' | 'AMMINISTRATORE' | 'UTENTE_AZIENDALE'

  type UserScope = 'INTERNAL' | 'WHOLE'


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

  interface LoggedEntity {
    authEntity: AuthEntity;
    baseUser: BaseUser;
  }

  interface ModulesInstancesMap {
    SCUOLA: string;
    OPERATORI: string;
    DRONI: string;
    ODS_ROOT: string;
  }

  interface MultiTenantController {

  }

  interface Tenant {
    _id: string;
    role: Role | ODSModule;
  }

  interface TenantInfo {
    tenant: Tenant;
    relativeGodRole: Role;
  }

  interface AuthEntity extends DomainObject {
    email: string;
    password: string;
    role: Role;
    instanceId: string;
  }

  interface BaseUser extends DomainObject {
    firstName: string;
    lastName: string;
    phone: string;
    address: Address;
    scope: UserScope;
  }

  interface BelongsToModule {
    module: ODSModule;
  }

  interface Business extends DomainObject {
    businessName: string;
    pIva: string;
    tel: string;
    pec: string;
    recipientCode: string;
    address: Address;
  }

  interface DomainObject {
    _id: string;
    entityType: ODSEntityType
  }

  interface HasTenant {
    tenantInfo: TenantInfo;
  }

  interface Instructor extends BaseUser {
    licenseCode: string;
  }

  interface InternalWholeSuiteUser extends BaseUser {
    modulesInstancesMap: ModulesInstancesMap;
  }

  interface InternalModuleUser extends BaseUser, BelongsToModule {
    moduleInstanceId: string;
  }

  interface School extends Business, HasTenant {
    cApr: number;
  }


  interface Student extends BaseUser {
    stateIssuedIdNumber: string;
    stateIssuedIsType: IdType;
    job: string;
    businessId?: string;
  }
}