/*==============================================================*/
/* DBMS name:      PostgreSQL 9.x                               */
/* Created on:     18/2/2025 19:21:03                           */
/*==============================================================*/


drop index POSTULACION_ADICIONAL_FK;

drop index ADICIONAL_PK;

drop table ADICIONAL;

drop index POSTULACION_ARTICULO_FK;

drop index ARTICULO_PK;

drop table ARTICULO;

drop index POSTULACION_AUTORIDAD_FK;

drop index AUTORIDAD_PK;

drop table AUTORIDAD;

drop index POSTULACION_CAPACITACION_FK;

drop index CAPACITACION_PK;

drop table CAPACITACION;

drop index CATEGORIA_PA_PK;

drop table CATEGORIA_PA;

drop index POSTULACION_IDIOMA_FK;

drop index CERTIFICADOIDIOMA_PK;

drop table CERTIFICADOIDIOMA;

drop index CONVOCATORIA_COMISION_FK;

drop index COMISION_PK;

drop table COMISION;

drop index CONVOCATORIA_PK;

drop table CONVOCATORIA;

drop index CONVOCATORIAS_GRADOS2_FK;

drop index CONVOCATORIAS_GRADOS_PK;

drop table CONVOCATORIAS_GRADOS;

drop index CERTIFICADOEVALDOCENTE_PK;

drop table EVALDOCENTE;

drop index POSTULACION_FACILITADORCES_FK;

drop index FACILITADORCES_PK;

drop table FACILITADORCES;

drop index POSTULACION_FACILITADORQA_FK;

drop index FACILITADORQA_PK;

drop table FACILITADORQA;

drop index POSTULACION_GESTIONEDUCATIVA_FK;

drop index GESTIONEDUCATIVA_PK;

drop table GESTIONEDUCATIVA;

drop index NIVEL_GRADO_FK;

drop index GRADO_PK;

drop table GRADO;

drop index GRADO_USUARIO2_FK;

drop index GRADO_USUARIO_PK;

drop table GRADO_USUARIO;

drop index POSTULACION_INVESTIGACION_FK;

drop index INVESTIGACION_PK;

drop table INVESTIGACION;

drop index CATEGORIA_NIVEL_FK;

drop index NIVEL_PK;

drop table NIVEL;

drop index POSTULACION_PAREXTERNO_FK;

drop index PAREXTERNO_PK;

drop table PAREXTERNO;

drop index POSTULACION_PONENCIA_FK;

drop index PONENCIA_PK;

drop table PONENCIA;

drop index RELATIONSHIP_30_FK;

drop index CONVOCATORIA_POSTULACION_FK;

drop index USUARIO_POSTULACION_FK;

drop index POSTULACION_PK;

drop table POSTULACION;

drop index ROL_PK;

drop table ROL;

drop index ROL_USUARIO2_FK;

drop index ROL_USUARIO_PK;

drop table ROL_USUARIO;

drop index POSTULACION_SABATICO_FK;

drop index SABATICO_PK;

drop table SABATICO;

drop index COMISION_SUBCOMOISION_FK;

drop index SUBCOMISION_PK;

drop table SUBCOMISION;

drop index POSTULACION_TESIS_FK;

drop index TESISDIRIGIDA_PK;

drop table TESISDIRIGIDA;

drop index TESIS_TESISTA_FK;

drop index TESISTA_PK;

drop table TESISTA;

drop index RELATIONSHIP_29_FK;

drop index COMISION_USUARIO_FK;

drop index SUBCOMISION_USUARIO_FK;

drop index USUARIO_PK;

drop table USUARIO;

/*==============================================================*/
/* Table: ADICIONAL                                             */
/*==============================================================*/
create table ADICIONAL (
   ADICIONAL_ID         NUMERIC(8)           not null,
   POSTULACION_ID       NUMERIC(8)           null,
   ADICIONAL_CRITERIO   VARCHAR(32)          null,
   ADICIONAL_FECHA      DATE                 null,
   ADICIONAL_COMENTARIO TEXT                 null,
   ADICIONAL_UBICACION  VARCHAR(128)         null,
   ADICIONAL_ESTADO     BOOL                 null,
   constraint PK_ADICIONAL primary key (ADICIONAL_ID)
);

/*==============================================================*/
/* Index: ADICIONAL_PK                                          */
/*==============================================================*/
create unique index ADICIONAL_PK on ADICIONAL (
ADICIONAL_ID
);

/*==============================================================*/
/* Index: POSTULACION_ADICIONAL_FK                              */
/*==============================================================*/
create  index POSTULACION_ADICIONAL_FK on ADICIONAL (
POSTULACION_ID
);

/*==============================================================*/
/* Table: ARTICULO                                              */
/*==============================================================*/
create table ARTICULO (
   ARTICULO_ID          NUMERIC(4)           not null,
   POSTULACION_ID       NUMERIC(8)           null,
   ARTICULO_TITULO      VARCHAR(128)         null,
   ARTICULO_NOMBREREVISTA VARCHAR(256)         null,
   ARTICULO_ORDENAUDITORIA VARCHAR(16)          null,
   ARTICULO_DOI         VARCHAR(64)          null,
   ARTICULO_ISSN        VARCHAR(16)          null,
   ARTICULO_FECHAPUBLICACION DATE                 null,
   ARTICULO_BDINDEXADA  VARCHAR(128)         null,
   ARTICULO_CUARTIL     NUMERIC(2)           null,
   ARTICULO_LINK        VARCHAR(256)         null,
   ARTICULO_UBICACION   VARCHAR(32)          null,
   ARTICULO_ESTADO      BOOL                 null,
   constraint PK_ARTICULO primary key (ARTICULO_ID)
);

/*==============================================================*/
/* Index: ARTICULO_PK                                           */
/*==============================================================*/
create unique index ARTICULO_PK on ARTICULO (
ARTICULO_ID
);

/*==============================================================*/
/* Index: POSTULACION_ARTICULO_FK                               */
/*==============================================================*/
create  index POSTULACION_ARTICULO_FK on ARTICULO (
POSTULACION_ID
);

/*==============================================================*/
/* Table: AUTORIDAD                                             */
/*==============================================================*/
create table AUTORIDAD (
   AUTORIDAD_ID         NUMERIC(4)           not null,
   POSTULACION_ID       NUMERIC(8)           null,
   AUTORIDAD_CARGO      VARCHAR(32)          null,
   AUTORIDAD_TIPOINSTI  VARCHAR(64)          null,
   AUTORIDAD_FECHAINICIO DATE                 null,
   AUTORIDAD_FECHAFIN   DATE                 null,
   AUTORIDAD_UBICACION  VARCHAR(128)         null,
   AUTORIDAD_ESTADO     BOOL                 null,
   constraint PK_AUTORIDAD primary key (AUTORIDAD_ID)
);

/*==============================================================*/
/* Index: AUTORIDAD_PK                                          */
/*==============================================================*/
create unique index AUTORIDAD_PK on AUTORIDAD (
AUTORIDAD_ID
);

/*==============================================================*/
/* Index: POSTULACION_AUTORIDAD_FK                              */
/*==============================================================*/
create  index POSTULACION_AUTORIDAD_FK on AUTORIDAD (
POSTULACION_ID
);

/*==============================================================*/
/* Table: CAPACITACION                                          */
/*==============================================================*/
create table CAPACITACION (
   CAPACITACION_ID      NUMERIC(8)           not null,
   POSTULACION_ID       NUMERIC(8)           null,
   CAPACITACION_NOMBREEVENTO NUMERIC(4)           null,
   CAPACITACION_INSTITUCION VARCHAR(64)          null,
   CAPACITACION_TIPOCERTIFICADO VARCHAR(16)          null,
   CAPACITACION_DURACION NUMERIC(4)           null,
   CAPACITACION_FECHAEVENTO DATE                 null,
   CAPACITACION_TIPOCAPACITACION VARCHAR(16)          null,
   CAPACITACION_UBICACION VARCHAR(128)         null,
   CAPACITACION_ESTADO  BOOL                 null,
   constraint PK_CAPACITACION primary key (CAPACITACION_ID)
);

/*==============================================================*/
/* Index: CAPACITACION_PK                                       */
/*==============================================================*/
create unique index CAPACITACION_PK on CAPACITACION (
CAPACITACION_ID
);

/*==============================================================*/
/* Index: POSTULACION_CAPACITACION_FK                           */
/*==============================================================*/
create  index POSTULACION_CAPACITACION_FK on CAPACITACION (
POSTULACION_ID
);

/*==============================================================*/
/* Table: CATEGORIA_PA                                          */
/*==============================================================*/
create table CATEGORIA_PA (
   CATEGORIAPA_ID       NUMERIC(4)           not null,
   CATEGORIAPA_NOMBRE   VARCHAR(32)          null,
   constraint PK_CATEGORIA_PA primary key (CATEGORIAPA_ID)
);

/*==============================================================*/
/* Index: CATEGORIA_PA_PK                                       */
/*==============================================================*/
create unique index CATEGORIA_PA_PK on CATEGORIA_PA (
CATEGORIAPA_ID
);

/*==============================================================*/
/* Table: CERTIFICADOIDIOMA                                     */
/*==============================================================*/
create table CERTIFICADOIDIOMA (
   IDIOMA_ID            NUMERIC(4)           not null,
   POSTULACION_ID       NUMERIC(8)           null,
   IDIOMA_NIVEL         VARCHAR(2)           null,
   IDIOMA_TITULOEXTRANJERO BOOL                 null,
   IDIOMA_UBICACION     VARCHAR(128)         null,
   ISIOMA_ESTADO        BOOL                 null,
   constraint PK_CERTIFICADOIDIOMA primary key (IDIOMA_ID)
);

/*==============================================================*/
/* Index: CERTIFICADOIDIOMA_PK                                  */
/*==============================================================*/
create unique index CERTIFICADOIDIOMA_PK on CERTIFICADOIDIOMA (
IDIOMA_ID
);

/*==============================================================*/
/* Index: POSTULACION_IDIOMA_FK                                 */
/*==============================================================*/
create  index POSTULACION_IDIOMA_FK on CERTIFICADOIDIOMA (
POSTULACION_ID
);

/*==============================================================*/
/* Table: COMISION                                              */
/*==============================================================*/
create table COMISION (
   COMISION_ID          NUMERIC(4)           not null,
   CONVOCATORIA_ID      NUMERIC(4)           null,
   COMISION_NOMBRE      VARCHAR(32)          null,
   constraint PK_COMISION primary key (COMISION_ID)
);

/*==============================================================*/
/* Index: COMISION_PK                                           */
/*==============================================================*/
create unique index COMISION_PK on COMISION (
COMISION_ID
);

/*==============================================================*/
/* Index: CONVOCATORIA_COMISION_FK                              */
/*==============================================================*/
create  index CONVOCATORIA_COMISION_FK on COMISION (
CONVOCATORIA_ID
);

/*==============================================================*/
/* Table: CONVOCATORIA                                          */
/*==============================================================*/
create table CONVOCATORIA (
   CONVOCATORIA_ID      NUMERIC(4)           not null,
   FECHA_INICIO         DATE                 null,
   FECHA_FIN            DATE                 null,
   ESTADO               VARCHAR(16)          null,
   constraint PK_CONVOCATORIA primary key (CONVOCATORIA_ID)
);

/*==============================================================*/
/* Index: CONVOCATORIA_PK                                       */
/*==============================================================*/
create unique index CONVOCATORIA_PK on CONVOCATORIA (
CONVOCATORIA_ID
);

/*==============================================================*/
/* Table: CONVOCATORIAS_GRADOS                                  */
/*==============================================================*/
create table CONVOCATORIAS_GRADOS (
   CONVOCATORIA_ID      NUMERIC(4)           not null,
   GRADO_ID             NUMERIC(4)           not null,
   CUPO                 NUMERIC(2)           not null,
   constraint PK_CONVOCATORIAS_GRADOS primary key (CONVOCATORIA_ID, GRADO_ID)
);

/*==============================================================*/
/* Index: CONVOCATORIAS_GRADOS_PK                               */
/*==============================================================*/
create unique index CONVOCATORIAS_GRADOS_PK on CONVOCATORIAS_GRADOS (
CONVOCATORIA_ID,
GRADO_ID
);

/*==============================================================*/
/* Index: CONVOCATORIAS_GRADOS2_FK                              */
/*==============================================================*/
create  index CONVOCATORIAS_GRADOS2_FK on CONVOCATORIAS_GRADOS (
GRADO_ID
);

/*==============================================================*/
/* Table: EVALDOCENTE                                           */
/*==============================================================*/
create table EVALDOCENTE (
   CED_ID               NUMERIC(4)           not null,
   POSTULACION_ID       NUMERIC(8)           null,
   CED_PORCENTAJE       NUMERIC(6,2)         null,
   CED_UBICACION        VARCHAR(32)          null,
   CED_ESTADO           BOOL                 null,
   constraint PK_EVALDOCENTE primary key (CED_ID)
);

/*==============================================================*/
/* Index: CERTIFICADOEVALDOCENTE_PK                             */
/*==============================================================*/
create unique index CERTIFICADOEVALDOCENTE_PK on EVALDOCENTE (
CED_ID
);

/*==============================================================*/
/* Table: FACILITADORCES                                        */
/*==============================================================*/
create table FACILITADORCES (
   CES_ID               NUMERIC(4)           not null,
   POSTULACION_ID       NUMERIC(8)           null,
   CES_TIPO             VARCHAR(32)          null,
   CES_UBICACION        VARCHAR(128)         null,
   CES_ESTADO           BOOL                 null,
   constraint PK_FACILITADORCES primary key (CES_ID)
);

/*==============================================================*/
/* Index: FACILITADORCES_PK                                     */
/*==============================================================*/
create unique index FACILITADORCES_PK on FACILITADORCES (
CES_ID
);

/*==============================================================*/
/* Index: POSTULACION_FACILITADORCES_FK                         */
/*==============================================================*/
create  index POSTULACION_FACILITADORCES_FK on FACILITADORCES (
POSTULACION_ID
);

/*==============================================================*/
/* Table: FACILITADORQA                                         */
/*==============================================================*/
create table FACILITADORQA (
   QA_ID                NUMERIC(4)           not null,
   POSTULACION_ID       NUMERIC(8)           null,
   QA_TIPO              VARCHAR(32)          null,
   QA_UBICACION         VARCHAR(128)         null,
   QA_ESTADO            BOOL                 null,
   constraint PK_FACILITADORQA primary key (QA_ID)
);

/*==============================================================*/
/* Index: FACILITADORQA_PK                                      */
/*==============================================================*/
create unique index FACILITADORQA_PK on FACILITADORQA (
QA_ID
);

/*==============================================================*/
/* Index: POSTULACION_FACILITADORQA_FK                          */
/*==============================================================*/
create  index POSTULACION_FACILITADORQA_FK on FACILITADORQA (
POSTULACION_ID
);

/*==============================================================*/
/* Table: GESTIONEDUCATIVA                                      */
/*==============================================================*/
create table GESTIONEDUCATIVA (
   GE_ID                VARCHAR(4)           not null,
   POSTULACION_ID       NUMERIC(8)           null,
   GE_ACTIVIDAD         VARCHAR(128)         null,
   GE_FECHAINICIO       DATE                 null,
   GE_FECHAFIN          DATE                 null,
   GE_UBICACION         VARCHAR(128)         null,
   GE_ESTADO            BOOL                 null,
   constraint PK_GESTIONEDUCATIVA primary key (GE_ID)
);

/*==============================================================*/
/* Index: GESTIONEDUCATIVA_PK                                   */
/*==============================================================*/
create unique index GESTIONEDUCATIVA_PK on GESTIONEDUCATIVA (
GE_ID
);

/*==============================================================*/
/* Index: POSTULACION_GESTIONEDUCATIVA_FK                       */
/*==============================================================*/
create  index POSTULACION_GESTIONEDUCATIVA_FK on GESTIONEDUCATIVA (
POSTULACION_ID
);

/*==============================================================*/
/* Table: GRADO                                                 */
/*==============================================================*/
create table GRADO (
   GRADO_ID             NUMERIC(4)           not null,
   NIVEL_ID             NUMERIC(4)           null,
   GRADO_NOMBRE         VARCHAR(32)          null,
   constraint PK_GRADO primary key (GRADO_ID)
);

/*==============================================================*/
/* Index: GRADO_PK                                              */
/*==============================================================*/
create unique index GRADO_PK on GRADO (
GRADO_ID
);

/*==============================================================*/
/* Index: NIVEL_GRADO_FK                                        */
/*==============================================================*/
create  index NIVEL_GRADO_FK on GRADO (
NIVEL_ID
);

/*==============================================================*/
/* Table: GRADO_USUARIO                                         */
/*==============================================================*/
create table GRADO_USUARIO (
   GRADO_ID             NUMERIC(4)           not null,
   USUARIO_ID           NUMERIC(4)           not null,
   FECHA_INICIO         DATE                 null,
   FECHA_FIN            DATE                 null,
   constraint PK_GRADO_USUARIO primary key (GRADO_ID, USUARIO_ID)
);

/*==============================================================*/
/* Index: GRADO_USUARIO_PK                                      */
/*==============================================================*/
create unique index GRADO_USUARIO_PK on GRADO_USUARIO (
GRADO_ID,
USUARIO_ID
);

/*==============================================================*/
/* Index: GRADO_USUARIO2_FK                                     */
/*==============================================================*/
create  index GRADO_USUARIO2_FK on GRADO_USUARIO (
USUARIO_ID
);

/*==============================================================*/
/* Table: INVESTIGACION                                         */
/*==============================================================*/
create table INVESTIGACION (
   INVESTIGACION_ID     NUMERIC(4)           not null,
   POSTULACION_ID       NUMERIC(8)           null,
   INVESTIGACION_TITULO VARCHAR(128)         null,
   INVESTIGACION_FECHAINICIO DATE                 null,
   INVESTIGACION_FECHAFIN DATE                 null,
   INVESTIGACION_TIPOPARTICIPACION VARCHAR(16)          null,
   INVESTIGACION_RESULTADOS VARCHAR(512)         null,
   INVESTIGACION_ENFOQUE VARCHAR(128)         null,
   INVESTIGACION_UBICACION VARCHAR(128)         null,
   INVESTIGACION_ESTADO BOOL                 null,
   constraint PK_INVESTIGACION primary key (INVESTIGACION_ID)
);

/*==============================================================*/
/* Index: INVESTIGACION_PK                                      */
/*==============================================================*/
create unique index INVESTIGACION_PK on INVESTIGACION (
INVESTIGACION_ID
);

/*==============================================================*/
/* Index: POSTULACION_INVESTIGACION_FK                          */
/*==============================================================*/
create  index POSTULACION_INVESTIGACION_FK on INVESTIGACION (
POSTULACION_ID
);

/*==============================================================*/
/* Table: NIVEL                                                 */
/*==============================================================*/
create table NIVEL (
   NIVEL_ID             NUMERIC(4)           not null,
   CATEGORIAPA_ID       NUMERIC(4)           null,
   NIVEL_NOMBRE         VARCHAR(32)          null,
   constraint PK_NIVEL primary key (NIVEL_ID)
);

/*==============================================================*/
/* Index: NIVEL_PK                                              */
/*==============================================================*/
create unique index NIVEL_PK on NIVEL (
NIVEL_ID
);

/*==============================================================*/
/* Index: CATEGORIA_NIVEL_FK                                    */
/*==============================================================*/
create  index CATEGORIA_NIVEL_FK on NIVEL (
CATEGORIAPA_ID
);

/*==============================================================*/
/* Table: PAREXTERNO                                            */
/*==============================================================*/
create table PAREXTERNO (
   PAREXTERNO_ID        NUMERIC(4)           not null,
   POSTULACION_ID       NUMERIC(8)           null,
   PAREXTERNO_TIPO      VARCHAR(32)          null,
   PAREXTERNO_UBICACION VARCHAR(132)         null,
   PAREXTERNO_ESTADO    BOOL                 null,
   constraint PK_PAREXTERNO primary key (PAREXTERNO_ID)
);

/*==============================================================*/
/* Index: PAREXTERNO_PK                                         */
/*==============================================================*/
create unique index PAREXTERNO_PK on PAREXTERNO (
PAREXTERNO_ID
);

/*==============================================================*/
/* Index: POSTULACION_PAREXTERNO_FK                             */
/*==============================================================*/
create  index POSTULACION_PAREXTERNO_FK on PAREXTERNO (
POSTULACION_ID
);

/*==============================================================*/
/* Table: PONENCIA                                              */
/*==============================================================*/
create table PONENCIA (
   PONENCIA_ID          NUMERIC(4)           not null,
   POSTULACION_ID       NUMERIC(8)           null,
   PONENCIA_TIPO        VARCHAR(16)          null,
   PONENCIA_AFINIDAD    VARCHAR(16)          null,
   PONENCIA_FECHA       DATE                 null,
   PONENCIA_UBICACION   VARCHAR(128)         null,
   PONENCIA_ESTADO      BOOL                 null,
   constraint PK_PONENCIA primary key (PONENCIA_ID)
);

/*==============================================================*/
/* Index: PONENCIA_PK                                           */
/*==============================================================*/
create unique index PONENCIA_PK on PONENCIA (
PONENCIA_ID
);

/*==============================================================*/
/* Index: POSTULACION_PONENCIA_FK                               */
/*==============================================================*/
create  index POSTULACION_PONENCIA_FK on PONENCIA (
POSTULACION_ID
);

/*==============================================================*/
/* Table: POSTULACION                                           */
/*==============================================================*/
create table POSTULACION (
   POSTULACION_ID       NUMERIC(8)           not null,
   USUARIO_ID           NUMERIC(4)           null,
   CONVOCATORIA_ID      NUMERIC(4)           null,
   USUARIOCOMISION_ID   NUMERIC(4)           null,
   POSTULACION_ESTADO   VARCHAR(32)          null,
   POSTULACION_CALIFICACION NUMERIC(6,2)         null,
   POSTULACION_TIPOACTIVIDADES NUMERIC(2)           null,
   constraint PK_POSTULACION primary key (POSTULACION_ID)
);

/*==============================================================*/
/* Index: POSTULACION_PK                                        */
/*==============================================================*/
create unique index POSTULACION_PK on POSTULACION (
POSTULACION_ID
);

/*==============================================================*/
/* Index: USUARIO_POSTULACION_FK                                */
/*==============================================================*/
create  index USUARIO_POSTULACION_FK on POSTULACION (
USUARIOCOMISION_ID
);

/*==============================================================*/
/* Index: CONVOCATORIA_POSTULACION_FK                           */
/*==============================================================*/
create  index CONVOCATORIA_POSTULACION_FK on POSTULACION (
CONVOCATORIA_ID
);

/*==============================================================*/
/* Index: RELATIONSHIP_30_FK                                    */
/*==============================================================*/
create  index RELATIONSHIP_30_FK on POSTULACION (
USUARIO_ID
);

/*==============================================================*/
/* Table: ROL                                                   */
/*==============================================================*/
create table ROL (
   ROL_ID               NUMERIC(4)           not null,
   ROL_NOMBRE           VARCHAR(32)          null,
   constraint PK_ROL primary key (ROL_ID)
);

/*==============================================================*/
/* Index: ROL_PK                                                */
/*==============================================================*/
create unique index ROL_PK on ROL (
ROL_ID
);

/*==============================================================*/
/* Table: ROL_USUARIO                                           */
/*==============================================================*/
create table ROL_USUARIO (
   ROL_ID               NUMERIC(4)           not null,
   USUARIO_ID           NUMERIC(4)           not null,
   constraint PK_ROL_USUARIO primary key (ROL_ID, USUARIO_ID)
);

/*==============================================================*/
/* Index: ROL_USUARIO_PK                                        */
/*==============================================================*/
create unique index ROL_USUARIO_PK on ROL_USUARIO (
ROL_ID,
USUARIO_ID
);

/*==============================================================*/
/* Index: ROL_USUARIO2_FK                                       */
/*==============================================================*/
create  index ROL_USUARIO2_FK on ROL_USUARIO (
USUARIO_ID
);

/*==============================================================*/
/* Table: SABATICO                                              */
/*==============================================================*/
create table SABATICO (
   SABATICO_ID          NUMERIC(4)           not null,
   POSTULACION_ID       NUMERIC(8)           null,
   SABATICO_CONFIRMACION BOOL                 null,
   SABATICO_UBICACION   VARCHAR(32)          null,
   SABATICO_ESTADO      BOOL                 null,
   constraint PK_SABATICO primary key (SABATICO_ID)
);

/*==============================================================*/
/* Index: SABATICO_PK                                           */
/*==============================================================*/
create unique index SABATICO_PK on SABATICO (
SABATICO_ID
);

/*==============================================================*/
/* Index: POSTULACION_SABATICO_FK                               */
/*==============================================================*/
create  index POSTULACION_SABATICO_FK on SABATICO (
POSTULACION_ID
);

/*==============================================================*/
/* Table: SUBCOMISION                                           */
/*==============================================================*/
create table SUBCOMISION (
   SUBCOMISION_ID       NUMERIC(4)           not null,
   COMISION_ID          NUMERIC(4)           null,
   SUBCOMISION_NOMBRE   VARCHAR(32)          null,
   constraint PK_SUBCOMISION primary key (SUBCOMISION_ID)
);

/*==============================================================*/
/* Index: SUBCOMISION_PK                                        */
/*==============================================================*/
create unique index SUBCOMISION_PK on SUBCOMISION (
SUBCOMISION_ID
);

/*==============================================================*/
/* Index: COMISION_SUBCOMOISION_FK                              */
/*==============================================================*/
create  index COMISION_SUBCOMOISION_FK on SUBCOMISION (
COMISION_ID
);

/*==============================================================*/
/* Table: TESISDIRIGIDA                                         */
/*==============================================================*/
create table TESISDIRIGIDA (
   TESIS_ID             NUMERIC(4)           not null,
   POSTULACION_ID       NUMERIC(8)           null,
   TESIS_TITULO         VARCHAR(128)         null,
   TESIS_FECHAPUBLICACION DATE                 null,
   TESIS_FECHACERTIFICACION DATE                 null,
   TESIS_TIPODIRECCION  VARCHAR(16)          null,
   TESIS_EXTERNA        BOOL                 null,
   TESIS_UNIVERSIDAD    VARCHAR(128)         null,
   TESIS_UBICACION      VARCHAR(128)         null,
   TESIS_ESTADO         BOOL                 null,
   constraint PK_TESISDIRIGIDA primary key (TESIS_ID)
);

/*==============================================================*/
/* Index: TESISDIRIGIDA_PK                                      */
/*==============================================================*/
create unique index TESISDIRIGIDA_PK on TESISDIRIGIDA (
TESIS_ID
);

/*==============================================================*/
/* Index: POSTULACION_TESIS_FK                                  */
/*==============================================================*/
create  index POSTULACION_TESIS_FK on TESISDIRIGIDA (
POSTULACION_ID
);

/*==============================================================*/
/* Table: TESISTA                                               */
/*==============================================================*/
create table TESISTA (
   TESISTA_ID           NUMERIC(4)           not null,
   TESIS_ID             NUMERIC(4)           null,
   TESISTA_NOMBRES      VARCHAR(128)         null,
   TESISTA_APELLIDOS    VARCHAR(128)         null,
   TESISTA_CI           VARCHAR(16)          null,
   TESISTA_DEPARTAMENTO VARCHAR(64)          null,
   TESISTA_SEDE         VARCHAR(64)          null,
   TESISTA_CARRERA      VARCHAR(64)          null,
   constraint PK_TESISTA primary key (TESISTA_ID)
);

/*==============================================================*/
/* Index: TESISTA_PK                                            */
/*==============================================================*/
create unique index TESISTA_PK on TESISTA (
TESISTA_ID
);

/*==============================================================*/
/* Index: TESIS_TESISTA_FK                                      */
/*==============================================================*/
create  index TESIS_TESISTA_FK on TESISTA (
TESIS_ID
);

/*==============================================================*/
/* Table: USUARIO                                               */
/*==============================================================*/
create table USUARIO (
   USUARIO_ID           NUMERIC(4)           not null,
   SUBCOMISION_ID       NUMERIC(4)           null,
   COMISION_ID          NUMERIC(4)           null,
   DELEGANTE_ID         NUMERIC(4)           null,
   USUARIO_USERNAME     VARCHAR(32)          null,
   USUARIO_PSWRD        VARCHAR(255)         null,
   USUARIO_CEDULA       VARCHAR(10)          null,
   USUARIO_NIVELESTUDIO VARCHAR(32)          null,
   USUARIO_TIPO         VARCHAR(32)          null,
   USUARIO_CORREO       VARCHAR(32)          null,
   USUARIO_PRIMERNOMBRE VARCHAR(16)          null,
   USUARIO_SEGUNDONOMBRE VARCHAR(16)          null,
   USUARIO_PRIMERAPELLIDO VARCHAR(16)          null,
   USUARIO_SEGUNDOAPELLIDO VARCHAR(16)          null,
   constraint PK_USUARIO primary key (USUARIO_ID)
);

/*==============================================================*/
/* Index: USUARIO_PK                                            */
/*==============================================================*/
create unique index USUARIO_PK on USUARIO (
USUARIO_ID
);

/*==============================================================*/
/* Index: SUBCOMISION_USUARIO_FK                                */
/*==============================================================*/
create  index SUBCOMISION_USUARIO_FK on USUARIO (
SUBCOMISION_ID
);

/*==============================================================*/
/* Index: COMISION_USUARIO_FK                                   */
/*==============================================================*/
create  index COMISION_USUARIO_FK on USUARIO (
COMISION_ID
);

/*==============================================================*/
/* Index: RELATIONSHIP_29_FK                                    */
/*==============================================================*/
create  index RELATIONSHIP_29_FK on USUARIO (
DELEGANTE_ID
);

alter table ADICIONAL
   add constraint FK_ADICIONA_POSTULACI_POSTULAC foreign key (POSTULACION_ID)
      references POSTULACION (POSTULACION_ID)
      on delete restrict on update restrict;

alter table ARTICULO
   add constraint FK_ARTICULO_POSTULACI_POSTULAC foreign key (POSTULACION_ID)
      references POSTULACION (POSTULACION_ID)
      on delete restrict on update restrict;

alter table AUTORIDAD
   add constraint FK_AUTORIDA_POSTULACI_POSTULAC foreign key (POSTULACION_ID)
      references POSTULACION (POSTULACION_ID)
      on delete restrict on update restrict;

alter table CAPACITACION
   add constraint FK_CAPACITA_POSTULACI_POSTULAC foreign key (POSTULACION_ID)
      references POSTULACION (POSTULACION_ID)
      on delete restrict on update restrict;

alter table CERTIFICADOIDIOMA
   add constraint FK_CERTIFIC_POSTULACI_POSTULAC foreign key (POSTULACION_ID)
      references POSTULACION (POSTULACION_ID)
      on delete restrict on update restrict;

alter table COMISION
   add constraint FK_COMISION_CONVOCATO_CONVOCAT foreign key (CONVOCATORIA_ID)
      references CONVOCATORIA (CONVOCATORIA_ID)
      on delete restrict on update restrict;

alter table CONVOCATORIAS_GRADOS
   add constraint FK_CONVOCAT_CONVOCATO_CONVOCAT foreign key (CONVOCATORIA_ID)
      references CONVOCATORIA (CONVOCATORIA_ID)
      on delete restrict on update restrict;

alter table CONVOCATORIAS_GRADOS
   add constraint FK_CONVOCAT_CONVOCATO_GRADO foreign key (GRADO_ID)
      references GRADO (GRADO_ID)
      on delete restrict on update restrict;

alter table EVALDOCENTE
   add constraint FK_EVALDOCE_POSTULACI_POSTULAC foreign key (POSTULACION_ID)
      references POSTULACION (POSTULACION_ID)
      on delete restrict on update restrict;

alter table FACILITADORCES
   add constraint FK_FACILITA_POSTULACI_POSTULAC foreign key (POSTULACION_ID)
      references POSTULACION (POSTULACION_ID)
      on delete restrict on update restrict;

alter table FACILITADORQA
   add constraint FK_FACILITA_POSTULACI_POSTULAC foreign key (POSTULACION_ID)
      references POSTULACION (POSTULACION_ID)
      on delete restrict on update restrict;

alter table GESTIONEDUCATIVA
   add constraint FK_GESTIONE_POSTULACI_POSTULAC foreign key (POSTULACION_ID)
      references POSTULACION (POSTULACION_ID)
      on delete restrict on update restrict;

alter table GRADO
   add constraint FK_GRADO_NIVEL_GRA_NIVEL foreign key (NIVEL_ID)
      references NIVEL (NIVEL_ID)
      on delete restrict on update restrict;

alter table GRADO_USUARIO
   add constraint FK_GRADO_US_GRADO_USU_GRADO foreign key (GRADO_ID)
      references GRADO (GRADO_ID)
      on delete restrict on update restrict;

alter table GRADO_USUARIO
   add constraint FK_GRADO_US_GRADO_USU_USUARIO foreign key (USUARIO_ID)
      references USUARIO (USUARIO_ID)
      on delete restrict on update restrict;

alter table INVESTIGACION
   add constraint FK_INVESTIG_POSTULACI_POSTULAC foreign key (POSTULACION_ID)
      references POSTULACION (POSTULACION_ID)
      on delete restrict on update restrict;

alter table NIVEL
   add constraint FK_NIVEL_CATEGORIA_CATEGORI foreign key (CATEGORIAPA_ID)
      references CATEGORIA_PA (CATEGORIAPA_ID)
      on delete restrict on update restrict;

alter table PAREXTERNO
   add constraint FK_PAREXTER_POSTULACI_POSTULAC foreign key (POSTULACION_ID)
      references POSTULACION (POSTULACION_ID)
      on delete restrict on update restrict;

alter table PONENCIA
   add constraint FK_PONENCIA_POSTULACI_POSTULAC foreign key (POSTULACION_ID)
      references POSTULACION (POSTULACION_ID)
      on delete restrict on update restrict;

alter table POSTULACION
   add constraint FK_POSTULAC_CONVOCATO_CONVOCAT foreign key (CONVOCATORIA_ID)
      references CONVOCATORIA (CONVOCATORIA_ID)
      on delete restrict on update restrict;

alter table POSTULACION
   add constraint FK_POSTULAC_USUARIOCO_USUARIO foreign key (USUARIO_ID)
      references USUARIO (USUARIO_ID)
      on delete restrict on update restrict;

alter table POSTULACION
   add constraint FK_POSTULAC_USUARIO_P_USUARIO foreign key (USUARIOCOMISION_ID)
      references USUARIO (USUARIO_ID)
      on delete restrict on update restrict;

alter table ROL_USUARIO
   add constraint FK_ROL_USUA_ROL_USUAR_ROL foreign key (ROL_ID)
      references ROL (ROL_ID)
      on delete restrict on update restrict;

alter table ROL_USUARIO
   add constraint FK_ROL_USUA_ROL_USUAR_USUARIO foreign key (USUARIO_ID)
      references USUARIO (USUARIO_ID)
      on delete restrict on update restrict;

alter table SABATICO
   add constraint FK_SABATICO_POSTULACI_POSTULAC foreign key (POSTULACION_ID)
      references POSTULACION (POSTULACION_ID)
      on delete restrict on update restrict;

alter table SUBCOMISION
   add constraint FK_SUBCOMIS_COMISION__COMISION foreign key (COMISION_ID)
      references COMISION (COMISION_ID)
      on delete restrict on update restrict;

alter table TESISDIRIGIDA
   add constraint FK_TESISDIR_POSTULACI_POSTULAC foreign key (POSTULACION_ID)
      references POSTULACION (POSTULACION_ID)
      on delete restrict on update restrict;

alter table TESISTA
   add constraint FK_TESISTA_TESIS_TES_TESISDIR foreign key (TESIS_ID)
      references TESISDIRIGIDA (TESIS_ID)
      on delete restrict on update restrict;

alter table USUARIO
   add constraint FK_USUARIO_COMISION__COMISION foreign key (COMISION_ID)
      references COMISION (COMISION_ID)
      on delete restrict on update restrict;

alter table USUARIO
   add constraint FK_USUARIO_SUBCOMISI_SUBCOMIS foreign key (SUBCOMISION_ID)
      references SUBCOMISION (SUBCOMISION_ID)
      on delete restrict on update restrict;

alter table USUARIO
   add constraint FK_USUARIO_USUARIO_D_USUARIO foreign key (DELEGANTE_ID)
      references USUARIO (USUARIO_ID)
      on delete restrict on update restrict;

