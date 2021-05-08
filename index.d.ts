export = Ods;
export as namespace Ods;

declare namespace Ods {

  type IdType = 'CARTA_ID' | 'PASSAPORTO' | 'PATENTE'

  type ODSModule = 'SCUOLA' | 'OPERATORI' | 'DRONI' | 'ODS_ROOT'

  type Role =
    'BASE'
    | 'STUDENTE'
    | 'ISTRUTTORE'
    | 'AMMINISTRATORE'
    | 'UTENTE_AZIENDALE'

  type UserScope = 'INTERNAL' | 'WHOLE'

  type QuestionStatus = 'OK' | 'BOZZA'

  type QuizAnswer = [string, number]

  type CourseStatus = 'BOZZA' | 'IN_CORSO' | 'BLOCCATO' | 'ARCHIVIATO'

  type EnrollmentStatus = 'ATTESA_PAGAMENTO' | 'DATI_MANCANTI' | 'COMPLETATA'

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
    firstInternalLogin?: boolean;
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

  interface InternalModuleUser extends BaseUser, BelongsToModule {
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
    rightAnswer: number;
    isPublic: boolean;
    status: QuestionStatus;
    subjectId: string;
    enacLicenseId: string;
  }

  export interface QuestionSubject extends DomainObject, HasNameAndDescription {
    enacLicenseId: string;
  }

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
    examDate: Date;
  }

  export interface ExamResult extends DomainObject {
    courseId: string;
    studentId: string;
    examDate: Date;
    result: [number, number];
    attachmentsUrls: string[];
  }

  export interface EnacLicense extends DomainObject, HasNameAndDescription {
    code: string;
  }

  export interface CourseExtra extends DomainObject, HasNameAndDescription {
    price: number;
    enrollmentId?: string;
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
    courseId: string;
  }

  export interface LessonType extends DomainObject, HasNameAndDescription {
  }

  export interface MediaContent extends DomainObject {
    bucketUrl: string;
    ownerEntityId: string;
    lessonId?: string;
  }

  export interface EnrollmentMeta {
    key: string;
    value: any;
  }

  export interface Enrollment extends DomainObject {
    studentId: string;
    extrasIds: string[];
    courseId: string;
    status: EnrollmentStatus;
    attachmentsUrls: string[];
    meta: EnrollmentMeta[];
  }
}
