export = Ods;
export as namespace Ods;

declare namespace Ods {

  type IdType = 'CARTA_ID' | 'PASSAPORTO' | 'PATENTE'

  type ODSModule = 'SCUOLA' | 'OPERATORI' | 'DRONI' | 'ODS_ROOT'

  type Role = 'BASE' | 'STUDENTE' | 'ISTRUTTORE' | 'AMMINISTRATORE' | 'UTENTE_AZIENDALE'

  type UserScope = 'INTERNAL' | 'WHOLE'

  type QuestionStatus = 'OK' | 'BOZZA'

  type AnswerNumber = 1 | 2 | 3 | 4

  type QuizAnswer = [string, AnswerNumber]

  type CourseStatus = 'BOZZA' | 'IN_CORSO' | 'BLOCCATO' | 'ARCHIVIATO'

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

  interface InternalModuleUser extends BaseUser {
    moduleInstanceId: string;
  }

  interface School extends Business {
    cApr: number;
  }

  interface Student extends BaseUser {
    stateIssuedIdNumber: string;
    stateIssuedIsType: IdType;
    job: string;
    businessId?: string;
  }

  export interface Question extends DomainObject {
    content: string;
    a1: string;
    a2: string;
    a3: string;
    a4: string;
    rightAnswer: AnswerNumber;
    isPublic: boolean;
    status: QuestionStatus;
    subjectId: string;
    enacLicenseId: string;
  }

  export interface QuestionSubject extends DomainObject, HasNameAndDescription {}

  export interface QuizResult extends DomainObject {
    date: Date;
    answers: QuizAnswer[];
  }

  export interface Course extends DomainObject {
    code: string;
    price: number;
    name: string;
    desc: string;
    period: [Date, Date];
    status: CourseStatus;
    instructorId: string;
    enacLicenseId: string;
  }

  export interface EnacLicense extends DomainObject, HasNameAndDescription {
    code: string;
  }

  export interface CourseExtra extends DomainObject, HasNameAndDescription {
    price: number;
  }

  export interface HasNameAndDescription {
    name: string;
    description: string;
  }

  export interface Lesson extends DomainObject, HasNameAndDescription {
    period: [Date, Date];
    isRemote: boolean;
    remoteLink?: string;
    lessonTypeId: string;
  }

  export interface LessonType extends DomainObject, HasNameAndDescription {}

  export interface MediaContent extends DomainObject {
    bucketUrl: string;
    courseId: string;
    lessonId?: string;
  }
}
