/*==============================================================*/
/* DBMS name:      PostgreSQL 9.x                               */
/* Created on:     7/1/2025 20:37:02                            */
/*==============================================================*/


drop index ADICIONAL_PK;

drop table ADICIONAL;

drop index RELATIONSHIP_5_FK;

drop index RELATIONSHIP_4_FK;

drop index APROBACION_PK;

drop table APROBACION;

drop index ARTICULO_PK;

drop table ARTICULO;

drop index AUTORIDAD_PK;

drop table AUTORIDAD;

drop index CAPACITACION_PK;

drop table CAPACITACION;

drop index CATEGORIA_DOCUEMTNO_PK;

drop table CATEGORIA_DOCUMENTO;

drop index CATEGORIA_PA_PK;

drop table CATEGORIA_PA;

drop index CERTIFICADOEVALDOCENTE_PK;

drop table CERTIFICADOEVALDOCENTE;

drop index CERTIFICADOIDIOMA_PK;

drop table CERTIFICADOIDIOMA;

drop index COMISION_PK;

drop table COMISION;

drop index CONVOCATORIA_PK;

drop table CONVOCATORIA;

drop index RELATIONSHIP_7_FK;

drop index RELATIONSHIP_6_FK;

drop index DOCUMENTO_PK;

drop table DOCUMENTO;

drop index FACILITADORCES_PK;

drop table FACILITADORCES;

drop index FACILITADORQA_PK;

drop table FACILITADORQA;

drop index GESTIONEDUCATIVA_PK;

drop table GESTIONEDUCATIVA;

drop index RELATIONSHIP_10_FK;

drop index GRADO_PK;

drop table GRADO;

drop index INVESTIGACION_PK;

drop table INVESTIGACION;

drop index RELATIONSHIP_9_FK;

drop index NIVEL_PK;

drop table NIVEL;

drop index PAREXTERNO_PK;

drop table PAREXTERNO;

drop index PONENCIA_PK;

drop table PONENCIA;

drop index RELATIONSHIP_8_FK;

drop index RELATIONSHIP_5_FK2;

drop index POSTULACION_PK;

drop table POSTULACION;

drop index RELATIONSHIP_2_FK;

drop index RELATIONSHIP_1_PK;

drop table RELATIONSHIP_1;

drop index ROL_PK;

drop table ROL;

drop index SABATICO_PK;

drop table SABATICO;

drop index RELATIONSHIP_13_FK;

drop index SUBCOMISION_PK;

drop table SUBCOMISION;

drop index TESISDIRIGIDA_PK;

drop table TESISDIRIGIDA;

drop index RELATIONSHIP_12_FK;

drop index TESISTA_PK;

drop table TESISTA;

drop index RELATIONSHIP_15_FK;

drop index RELATIONSHIP_14_FK;

drop index RELATIONSHIP_11_FK;

drop index USUARIO_PK;

drop table USUARIO;

/*==============================================================*/
/* Table: ADICIONAL                                             */
/*==============================================================*/
create table ADICIONAL (
   DOCUMENTO_ID         NUMERIC(8)           not null,
   ADICIONAL_ID         NUMERIC(8)           not null,
   POSTULACION_ID       NUMERIC(8)           null,
   CATEGORIA_ID         NUMERIC(4)           null,
   DOCUMENTO_NOMBRE     VARCHAR(64)          null,
   DOCUMENTO_UBICACION  VARCHAR(256)         null,
   ADICIONAL_CRITERIO   VARCHAR(32)          null,
   ADICIONAL_FECHA      DATE                 null,
   ADICIONAL_COMENTARIO TEXT                 null,
   constraint PK_ADICIONAL primary key (DOCUMENTO_ID, ADICIONAL_ID)
);

/*==============================================================*/
/* Index: ADICIONAL_PK                                          */
/*==============================================================*/
create unique index ADICIONAL_PK on ADICIONAL (
DOCUMENTO_ID,
ADICIONAL_ID
);

/*==============================================================*/
/* Table: APROBACION                                            */
/*==============================================================*/
create table APROBACION (
   APROBACION_ID        NUMERIC(4)           not null,
   DOCUMENTO_ID         NUMERIC(8)           null,
   USUARIO_ID           NUMERIC(4)           null,
   APROBACION_FECHA     DATE                 null,
   APROBACION_ESTADO    VARCHAR(16)          null,
   APROBACION_COMENTARIO TEXT                 null,
   constraint PK_APROBACION primary key (APROBACION_ID)
);

/*==============================================================*/
/* Index: APROBACION_PK                                         */
/*==============================================================*/
create unique index APROBACION_PK on APROBACION (
APROBACION_ID
);

/*==============================================================*/
/* Index: RELATIONSHIP_4_FK                                     */
/*==============================================================*/
create  index RELATIONSHIP_4_FK on APROBACION (
USUARIO_ID
);

/*==============================================================*/
/* Index: RELATIONSHIP_5_FK                                     */
/*==============================================================*/
create  index RELATIONSHIP_5_FK on APROBACION (
DOCUMENTO_ID
);

/*==============================================================*/
/* Table: ARTICULO                                              */
/*==============================================================*/
create table ARTICULO (
   DOCUMENTO_ID         NUMERIC(8)           not null,
   ARTICULO_ID          NUMERIC(4)           not null,
   POSTULACION_ID       NUMERIC(8)           null,
   CATEGORIA_ID         NUMERIC(4)           null,
   DOCUMENTO_NOMBRE     VARCHAR(64)          null,
   DOCUMENTO_UBICACION  VARCHAR(256)         null,
   ARTICULO_NOMBREREVISTA VARCHAR(256)         null,
   ARTICULO_ORDENAUDITORIA VARCHAR(16)          null,
   ARTICULO_DOI         VARCHAR(64)          null,
   ARTICULO_ISSN        VARCHAR(16)          null,
   ARTICULO_FECHAPUBLICACION DATE                 null,
   ARTICULO_BDINDEXADA  VARCHAR(128)         null,
   ARTICULO_CUARTIL     NUMERIC(2)           null,
   ARTICULO_LINK        VARCHAR(256)         null,
   ARTICULO_RANKPERCENTAGE BOOL                 null,
   constraint PK_ARTICULO primary key (DOCUMENTO_ID, ARTICULO_ID)
);

/*==============================================================*/
/* Index: ARTICULO_PK                                           */
/*==============================================================*/
create unique index ARTICULO_PK on ARTICULO (
DOCUMENTO_ID,
ARTICULO_ID
);

/*==============================================================*/
/* Table: AUTORIDAD                                             */
/*==============================================================*/
create table AUTORIDAD (
   DOCUMENTO_ID         NUMERIC(8)           not null,
   AUTORIDAD_ID         NUMERIC(4)           not null,
   POSTULACION_ID       NUMERIC(8)           null,
   CATEGORIA_ID         NUMERIC(4)           null,
   DOCUMENTO_NOMBRE     VARCHAR(64)          null,
   DOCUMENTO_UBICACION  VARCHAR(256)         null,
   AUTORIDAD_CARGO      VARCHAR(32)          null,
   AUTORIDAD_TIPOINSTI  BOOL                 null,
   AUTORIDAD_TIEMPO     NUMERIC(4,2)         null,
   constraint PK_AUTORIDAD primary key (DOCUMENTO_ID, AUTORIDAD_ID)
);

/*==============================================================*/
/* Index: AUTORIDAD_PK                                          */
/*==============================================================*/
create unique index AUTORIDAD_PK on AUTORIDAD (
DOCUMENTO_ID,
AUTORIDAD_ID
);

/*==============================================================*/
/* Table: CAPACITACION                                          */
/*==============================================================*/
create table CAPACITACION (
   DOCUMENTO_ID         NUMERIC(8)           not null,
   CAPACITACION_ID      NUMERIC(8)           not null,
   POSTULACION_ID       NUMERIC(8)           null,
   CATEGORIA_ID         NUMERIC(4)           null,
   DOCUMENTO_NOMBRE     VARCHAR(64)          null,
   DOCUMENTO_UBICACION  VARCHAR(256)         null,
   CAPACITACION_NOMBREEVENTO NUMERIC(4)           null,
   CAPACITACION_INSTITUCION VARCHAR(64)          null,
   CAPACITACION_TIPOCERTIFICADO VARCHAR(16)          null,
   CAPACITACION_DURACION NUMERIC(4)           null,
   CAPACITACION_FECHAEVENTO DATE                 null,
   CAPACITACION_TIPOCAPACITACION VARCHAR(16)          null,
   constraint PK_CAPACITACION primary key (DOCUMENTO_ID, CAPACITACION_ID)
);

/*==============================================================*/
/* Index: CAPACITACION_PK                                       */
/*==============================================================*/
create unique index CAPACITACION_PK on CAPACITACION (
DOCUMENTO_ID,
CAPACITACION_ID
);

/*==============================================================*/
/* Table: CATEGORIA_DOCUMENTO                                   */
/*==============================================================*/
create table CATEGORIA_DOCUMENTO (
   CATEGORIA_ID         NUMERIC(4)           not null,
   CATEGORIA_NOMBRE     VARCHAR(32)          null,
   constraint PK_CATEGORIA_DOCUMENTO primary key (CATEGORIA_ID)
);

/*==============================================================*/
/* Index: CATEGORIA_DOCUEMTNO_PK                                */
/*==============================================================*/
create unique index CATEGORIA_DOCUEMTNO_PK on CATEGORIA_DOCUMENTO (
CATEGORIA_ID
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
/* Table: CERTIFICADOEVALDOCENTE                                */
/*==============================================================*/
create table CERTIFICADOEVALDOCENTE (
   DOCUMENTO_ID         NUMERIC(8)           not null,
   CED_ID               NUMERIC(4)           not null,
   POSTULACION_ID       NUMERIC(8)           null,
   CATEGORIA_ID         NUMERIC(4)           null,
   DOCUMENTO_NOMBRE     VARCHAR(64)          null,
   DOCUMENTO_UBICACION  VARCHAR(256)         null,
   CED_PORCENTAJE       NUMERIC(6,2)         null,
   constraint PK_CERTIFICADOEVALDOCENTE primary key (DOCUMENTO_ID, CED_ID)
);

/*==============================================================*/
/* Index: CERTIFICADOEVALDOCENTE_PK                             */
/*==============================================================*/
create unique index CERTIFICADOEVALDOCENTE_PK on CERTIFICADOEVALDOCENTE (
DOCUMENTO_ID,
CED_ID
);

/*==============================================================*/
/* Table: CERTIFICADOIDIOMA                                     */
/*==============================================================*/
create table CERTIFICADOIDIOMA (
   DOCUMENTO_ID         NUMERIC(8)           not null,
   IDIOMA_ID            NUMERIC(4)           not null,
   POSTULACION_ID       NUMERIC(8)           null,
   CATEGORIA_ID         NUMERIC(4)           null,
   DOCUMENTO_NOMBRE     VARCHAR(64)          null,
   DOCUMENTO_UBICACION  VARCHAR(256)         null,
   IDIOMA_NIVEL         VARCHAR(2)           null,
   IDIOMA_TITULOEXTRANJERO BOOL                 null,
   constraint PK_CERTIFICADOIDIOMA primary key (DOCUMENTO_ID, IDIOMA_ID)
);

/*==============================================================*/
/* Index: CERTIFICADOIDIOMA_PK                                  */
/*==============================================================*/
create unique index CERTIFICADOIDIOMA_PK on CERTIFICADOIDIOMA (
DOCUMENTO_ID,
IDIOMA_ID
);

/*==============================================================*/
/* Table: COMISION                                              */
/*==============================================================*/
create table COMISION (
   COMISION_ID          NUMERIC(4)           not null,
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
/* Table: CONVOCATORIA                                          */
/*==============================================================*/
create table CONVOCATORIA (
   CONVOCATORIA_ID      NUMERIC(4)           not null,
   FECHA_INICIO         DATE                 null,
   FECHA_FIN            DATE                 null,
   constraint PK_CONVOCATORIA primary key (CONVOCATORIA_ID)
);

/*==============================================================*/
/* Index: CONVOCATORIA_PK                                       */
/*==============================================================*/
create unique index CONVOCATORIA_PK on CONVOCATORIA (
CONVOCATORIA_ID
);

/*==============================================================*/
/* Table: DOCUMENTO                                             */
/*==============================================================*/
create table DOCUMENTO (
   DOCUMENTO_ID         NUMERIC(8)           not null,
   POSTULACION_ID       NUMERIC(8)           null,
   CATEGORIA_ID         NUMERIC(4)           null,
   DOCUMENTO_NOMBRE     VARCHAR(64)          null,
   DOCUMENTO_UBICACION  VARCHAR(256)         null,
   constraint PK_DOCUMENTO primary key (DOCUMENTO_ID)
);

/*==============================================================*/
/* Index: DOCUMENTO_PK                                          */
/*==============================================================*/
create unique index DOCUMENTO_PK on DOCUMENTO (
DOCUMENTO_ID
);

/*==============================================================*/
/* Index: RELATIONSHIP_6_FK                                     */
/*==============================================================*/
create  index RELATIONSHIP_6_FK on DOCUMENTO (
POSTULACION_ID
);

/*==============================================================*/
/* Index: RELATIONSHIP_7_FK                                     */
/*==============================================================*/
create  index RELATIONSHIP_7_FK on DOCUMENTO (
CATEGORIA_ID
);

/*==============================================================*/
/* Table: FACILITADORCES                                        */
/*==============================================================*/
create table FACILITADORCES (
   DOCUMENTO_ID         NUMERIC(8)           not null,
   POSTULACION_ID       NUMERIC(8)           null,
   CATEGORIA_ID         NUMERIC(4)           null,
   DOCUMENTO_NOMBRE     VARCHAR(64)          null,
   DOCUMENTO_UBICACION  VARCHAR(256)         null,
   CES_ID               NUMERIC(4)           null,
   CES_TIPO             VARCHAR(32)          null,
   constraint PK_FACILITADORCES primary key (DOCUMENTO_ID)
);

/*==============================================================*/
/* Index: FACILITADORCES_PK                                     */
/*==============================================================*/
create unique index FACILITADORCES_PK on FACILITADORCES (
DOCUMENTO_ID
);

/*==============================================================*/
/* Table: FACILITADORQA                                         */
/*==============================================================*/
create table FACILITADORQA (
   DOCUMENTO_ID         NUMERIC(8)           not null,
   POSTULACION_ID       NUMERIC(8)           null,
   CATEGORIA_ID         NUMERIC(4)           null,
   DOCUMENTO_NOMBRE     VARCHAR(64)          null,
   DOCUMENTO_UBICACION  VARCHAR(256)         null,
   QA_ID                NUMERIC(4)           null,
   QA_TIPO              VARCHAR(32)          null,
   constraint PK_FACILITADORQA primary key (DOCUMENTO_ID)
);

/*==============================================================*/
/* Index: FACILITADORQA_PK                                      */
/*==============================================================*/
create unique index FACILITADORQA_PK on FACILITADORQA (
DOCUMENTO_ID
);

/*==============================================================*/
/* Table: GESTIONEDUCATIVA                                      */
/*==============================================================*/
create table GESTIONEDUCATIVA (
   DOCUMENTO_ID         NUMERIC(8)           not null,
   GE_ID                VARCHAR(4)           not null,
   POSTULACION_ID       NUMERIC(8)           null,
   CATEGORIA_ID         NUMERIC(4)           null,
   DOCUMENTO_NOMBRE     VARCHAR(64)          null,
   DOCUMENTO_UBICACION  VARCHAR(256)         null,
   GE_ACTIVIDAD         VARCHAR(32)          null,
   GE_FECHAFIN          DATE                 null,
   constraint PK_GESTIONEDUCATIVA primary key (DOCUMENTO_ID, GE_ID)
);

/*==============================================================*/
/* Index: GESTIONEDUCATIVA_PK                                   */
/*==============================================================*/
create unique index GESTIONEDUCATIVA_PK on GESTIONEDUCATIVA (
DOCUMENTO_ID,
GE_ID
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
/* Index: RELATIONSHIP_10_FK                                    */
/*==============================================================*/
create  index RELATIONSHIP_10_FK on GRADO (
NIVEL_ID
);

/*==============================================================*/
/* Table: INVESTIGACION                                         */
/*==============================================================*/
create table INVESTIGACION (
   DOCUMENTO_ID         NUMERIC(8)           not null,
   INVESTIGACION_ID     NUMERIC(4)           not null,
   POSTULACION_ID       NUMERIC(8)           null,
   CATEGORIA_ID         NUMERIC(4)           null,
   DOCUMENTO_NOMBRE     VARCHAR(64)          null,
   DOCUMENTO_UBICACION  VARCHAR(256)         null,
   INVESTIGACION_FECHAINICIO DATE                 null,
   INVESTIGACION_FECHAFIN DATE                 null,
   INVESTIGACION_TIPOPARTICIPACION VARCHAR(16)          null,
   INVESTIGACION_RESULTADOS VARCHAR(512)         null,
   INVESTIGACION_ENFOQUE BOOL                 null,
   constraint PK_INVESTIGACION primary key (DOCUMENTO_ID, INVESTIGACION_ID)
);

/*==============================================================*/
/* Index: INVESTIGACION_PK                                      */
/*==============================================================*/
create unique index INVESTIGACION_PK on INVESTIGACION (
DOCUMENTO_ID,
INVESTIGACION_ID
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
/* Index: RELATIONSHIP_9_FK                                     */
/*==============================================================*/
create  index RELATIONSHIP_9_FK on NIVEL (
CATEGORIAPA_ID
);

/*==============================================================*/
/* Table: PAREXTERNO                                            */
/*==============================================================*/
create table PAREXTERNO (
   DOCUMENTO_ID         NUMERIC(8)           not null,
   PAREXTERNO_ID        NUMERIC(4)           not null,
   POSTULACION_ID       NUMERIC(8)           null,
   CATEGORIA_ID         NUMERIC(4)           null,
   DOCUMENTO_NOMBRE     VARCHAR(64)          null,
   DOCUMENTO_UBICACION  VARCHAR(256)         null,
   PAREXTERNO_TIPO      VARCHAR(32)          null,
   constraint PK_PAREXTERNO primary key (DOCUMENTO_ID, PAREXTERNO_ID)
);

/*==============================================================*/
/* Index: PAREXTERNO_PK                                         */
/*==============================================================*/
create unique index PAREXTERNO_PK on PAREXTERNO (
DOCUMENTO_ID,
PAREXTERNO_ID
);

/*==============================================================*/
/* Table: PONENCIA                                              */
/*==============================================================*/
create table PONENCIA (
   DOCUMENTO_ID         NUMERIC(8)           not null,
   PONENCIA_ID          NUMERIC(4)           not null,
   POSTULACION_ID       NUMERIC(8)           null,
   CATEGORIA_ID         NUMERIC(4)           null,
   DOCUMENTO_NOMBRE     VARCHAR(64)          null,
   DOCUMENTO_UBICACION  VARCHAR(256)         null,
   PONENCIA_TIPO        VARCHAR(16)          null,
   PONENCIA_AFINIDAD    VARCHAR(16)          null,
   PONENCIA_FECHA       DATE                 null,
   constraint PK_PONENCIA primary key (DOCUMENTO_ID, PONENCIA_ID)
);

/*==============================================================*/
/* Index: PONENCIA_PK                                           */
/*==============================================================*/
create unique index PONENCIA_PK on PONENCIA (
DOCUMENTO_ID,
PONENCIA_ID
);

/*==============================================================*/
/* Table: POSTULACION                                           */
/*==============================================================*/
create table POSTULACION (
   POSTULACION_ID       NUMERIC(8)           not null,
   CONVOCATORIA_ID      NUMERIC(4)           null,
   USUARIO_ID           NUMERIC(4)           null,
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
/* Index: RELATIONSHIP_5_FK2                                    */
/*==============================================================*/
create  index RELATIONSHIP_5_FK2 on POSTULACION (
USUARIO_ID
);

/*==============================================================*/
/* Index: RELATIONSHIP_8_FK                                     */
/*==============================================================*/
create  index RELATIONSHIP_8_FK on POSTULACION (
CONVOCATORIA_ID
);

/*==============================================================*/
/* Table: RELATIONSHIP_1                                        */
/*==============================================================*/
create table RELATIONSHIP_1 (
   ROL_ID               NUMERIC(4)           not null,
   USUARIO_ID           NUMERIC(4)           not null,
   constraint PK_RELATIONSHIP_1 primary key (ROL_ID, USUARIO_ID)
);

/*==============================================================*/
/* Index: RELATIONSHIP_1_PK                                     */
/*==============================================================*/
create unique index RELATIONSHIP_1_PK on RELATIONSHIP_1 (
ROL_ID,
USUARIO_ID
);

/*==============================================================*/
/* Index: RELATIONSHIP_2_FK                                     */
/*==============================================================*/
create  index RELATIONSHIP_2_FK on RELATIONSHIP_1 (
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
/* Table: SABATICO                                              */
/*==============================================================*/
create table SABATICO (
   DOCUMENTO_ID         NUMERIC(8)           not null,
   SABATICO_ID          NUMERIC(4)           not null,
   POSTULACION_ID       NUMERIC(8)           null,
   CATEGORIA_ID         NUMERIC(4)           null,
   DOCUMENTO_NOMBRE     VARCHAR(64)          null,
   DOCUMENTO_UBICACION  VARCHAR(256)         null,
   constraint PK_SABATICO primary key (DOCUMENTO_ID, SABATICO_ID)
);

/*==============================================================*/
/* Index: SABATICO_PK                                           */
/*==============================================================*/
create unique index SABATICO_PK on SABATICO (
DOCUMENTO_ID,
SABATICO_ID
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
/* Index: RELATIONSHIP_13_FK                                    */
/*==============================================================*/
create  index RELATIONSHIP_13_FK on SUBCOMISION (
COMISION_ID
);

/*==============================================================*/
/* Table: TESISDIRIGIDA                                         */
/*==============================================================*/
create table TESISDIRIGIDA (
   DOCUMENTO_ID         NUMERIC(8)           not null,
   TESIS_ID             NUMERIC(4)           not null,
   POSTULACION_ID       NUMERIC(8)           null,
   CATEGORIA_ID         NUMERIC(4)           null,
   DOCUMENTO_NOMBRE     VARCHAR(64)          null,
   DOCUMENTO_UBICACION  VARCHAR(256)         null,
   TESIS_FECHAPUBLICACION DATE                 null,
   TESIS_FECHACERTIFICACION DATE                 null,
   TESIS_TIPODIRECCION  VARCHAR(16)          null,
   TESIS_EXTERNA        BOOL                 null,
   TESIS_UNIVERSIDAD    VARCHAR(128)         null,
   constraint PK_TESISDIRIGIDA primary key (DOCUMENTO_ID, TESIS_ID)
);

/*==============================================================*/
/* Index: TESISDIRIGIDA_PK                                      */
/*==============================================================*/
create unique index TESISDIRIGIDA_PK on TESISDIRIGIDA (
DOCUMENTO_ID,
TESIS_ID
);

/*==============================================================*/
/* Table: TESISTA                                               */
/*==============================================================*/
create table TESISTA (
   TESISTA_ID           NUMERIC(4)           not null,
   DOCUMENTO_ID         NUMERIC(8)           null,
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
/* Index: RELATIONSHIP_12_FK                                    */
/*==============================================================*/
create  index RELATIONSHIP_12_FK on TESISTA (
DOCUMENTO_ID,
TESIS_ID
);

/*==============================================================*/
/* Table: USUARIO                                               */
/*==============================================================*/
create table USUARIO (
   USUARIO_ID           NUMERIC(4)           not null,
   SUBCOMISION_ID       NUMERIC(4)           null,
   COMISION_ID          NUMERIC(4)           null,
   GRADO_ID             NUMERIC(4)           null,
   USUARIO_USERNAME     VARCHAR(32)          null,
   USUARIO_PSWRD        VARCHAR(255)         null,
   constraint PK_USUARIO primary key (USUARIO_ID)
);

/*==============================================================*/
/* Index: USUARIO_PK                                            */
/*==============================================================*/
create unique index USUARIO_PK on USUARIO (
USUARIO_ID
);

/*==============================================================*/
/* Index: RELATIONSHIP_11_FK                                    */
/*==============================================================*/
create  index RELATIONSHIP_11_FK on USUARIO (
GRADO_ID
);

/*==============================================================*/
/* Index: RELATIONSHIP_14_FK                                    */
/*==============================================================*/
create  index RELATIONSHIP_14_FK on USUARIO (
SUBCOMISION_ID
);

/*==============================================================*/
/* Index: RELATIONSHIP_15_FK                                    */
/*==============================================================*/
create  index RELATIONSHIP_15_FK on USUARIO (
COMISION_ID
);

alter table ADICIONAL
   add constraint FK_ADICIONA_INHERITAN_DOCUMENT foreign key (DOCUMENTO_ID)
      references DOCUMENTO (DOCUMENTO_ID)
      on delete restrict on update restrict;

alter table APROBACION
   add constraint FK_APROBACI_RELATIONS_USUARIO foreign key (USUARIO_ID)
      references USUARIO (USUARIO_ID)
      on delete restrict on update restrict;

alter table APROBACION
   add constraint FK_APROBACI_RELATIONS_DOCUMENT foreign key (DOCUMENTO_ID)
      references DOCUMENTO (DOCUMENTO_ID)
      on delete restrict on update restrict;

alter table ARTICULO
   add constraint FK_ARTICULO_INHERITAN_DOCUMENT foreign key (DOCUMENTO_ID)
      references DOCUMENTO (DOCUMENTO_ID)
      on delete restrict on update restrict;

alter table AUTORIDAD
   add constraint FK_AUTORIDA_INHERITAN_DOCUMENT foreign key (DOCUMENTO_ID)
      references DOCUMENTO (DOCUMENTO_ID)
      on delete restrict on update restrict;

alter table CAPACITACION
   add constraint FK_CAPACITA_INHERITAN_DOCUMENT foreign key (DOCUMENTO_ID)
      references DOCUMENTO (DOCUMENTO_ID)
      on delete restrict on update restrict;

alter table CERTIFICADOEVALDOCENTE
   add constraint FK_CERTIFIC_INHERITAN_DOCUMENT foreign key (DOCUMENTO_ID)
      references DOCUMENTO (DOCUMENTO_ID)
      on delete restrict on update restrict;

alter table CERTIFICADOIDIOMA
   add constraint FK_CERTIFIC_INHERITAN_DOCUMENT foreign key (DOCUMENTO_ID)
      references DOCUMENTO (DOCUMENTO_ID)
      on delete restrict on update restrict;

alter table DOCUMENTO
   add constraint FK_DOCUMENT_RELATIONS_POSTULAC foreign key (POSTULACION_ID)
      references POSTULACION (POSTULACION_ID)
      on delete restrict on update restrict;

alter table DOCUMENTO
   add constraint FK_DOCUMENT_RELATIONS_CATEGORI foreign key (CATEGORIA_ID)
      references CATEGORIA_DOCUMENTO (CATEGORIA_ID)
      on delete restrict on update restrict;

alter table FACILITADORCES
   add constraint FK_FACILITA_INHERITAN_DOCUMENT foreign key (DOCUMENTO_ID)
      references DOCUMENTO (DOCUMENTO_ID)
      on delete restrict on update restrict;

alter table FACILITADORQA
   add constraint FK_FACILITA_INHERITAN_DOCUMENT foreign key (DOCUMENTO_ID)
      references DOCUMENTO (DOCUMENTO_ID)
      on delete restrict on update restrict;

alter table GESTIONEDUCATIVA
   add constraint FK_GESTIONE_INHERITAN_DOCUMENT foreign key (DOCUMENTO_ID)
      references DOCUMENTO (DOCUMENTO_ID)
      on delete restrict on update restrict;

alter table GRADO
   add constraint FK_GRADO_RELATIONS_NIVEL foreign key (NIVEL_ID)
      references NIVEL (NIVEL_ID)
      on delete restrict on update restrict;

alter table INVESTIGACION
   add constraint FK_INVESTIG_INHERITAN_DOCUMENT foreign key (DOCUMENTO_ID)
      references DOCUMENTO (DOCUMENTO_ID)
      on delete restrict on update restrict;

alter table NIVEL
   add constraint FK_NIVEL_RELATIONS_CATEGORI foreign key (CATEGORIAPA_ID)
      references CATEGORIA_PA (CATEGORIAPA_ID)
      on delete restrict on update restrict;

alter table PAREXTERNO
   add constraint FK_PAREXTER_INHERITAN_DOCUMENT foreign key (DOCUMENTO_ID)
      references DOCUMENTO (DOCUMENTO_ID)
      on delete restrict on update restrict;

alter table PONENCIA
   add constraint FK_PONENCIA_INHERITAN_DOCUMENT foreign key (DOCUMENTO_ID)
      references DOCUMENTO (DOCUMENTO_ID)
      on delete restrict on update restrict;

alter table POSTULACION
   add constraint FK_POSTULAC_RELATIONS_USUARIO foreign key (USUARIO_ID)
      references USUARIO (USUARIO_ID)
      on delete restrict on update restrict;

alter table POSTULACION
   add constraint FK_POSTULAC_RELATIONS_CONVOCAT foreign key (CONVOCATORIA_ID)
      references CONVOCATORIA (CONVOCATORIA_ID)
      on delete restrict on update restrict;

alter table RELATIONSHIP_1
   add constraint FK_RELATION_RELATIONS_ROL foreign key (ROL_ID)
      references ROL (ROL_ID)
      on delete restrict on update restrict;

alter table RELATIONSHIP_1
   add constraint FK_RELATION_RELATIONS_USUARIO foreign key (USUARIO_ID)
      references USUARIO (USUARIO_ID)
      on delete restrict on update restrict;

alter table SABATICO
   add constraint FK_SABATICO_INHERITAN_DOCUMENT foreign key (DOCUMENTO_ID)
      references DOCUMENTO (DOCUMENTO_ID)
      on delete restrict on update restrict;

alter table SUBCOMISION
   add constraint FK_SUBCOMIS_RELATIONS_COMISION foreign key (COMISION_ID)
      references COMISION (COMISION_ID)
      on delete restrict on update restrict;

alter table TESISDIRIGIDA
   add constraint FK_TESISDIR_INHERITAN_DOCUMENT foreign key (DOCUMENTO_ID)
      references DOCUMENTO (DOCUMENTO_ID)
      on delete restrict on update restrict;

alter table TESISTA
   add constraint FK_TESISTA_RELATIONS_TESISDIR foreign key (DOCUMENTO_ID, TESIS_ID)
      references TESISDIRIGIDA (DOCUMENTO_ID, TESIS_ID)
      on delete restrict on update restrict;

alter table USUARIO
   add constraint FK_USUARIO_RELATIONS_GRADO foreign key (GRADO_ID)
      references GRADO (GRADO_ID)
      on delete restrict on update restrict;

alter table USUARIO
   add constraint FK_USUARIO_RELATIONS_SUBCOMIS foreign key (SUBCOMISION_ID)
      references SUBCOMISION (SUBCOMISION_ID)
      on delete restrict on update restrict;

alter table USUARIO
   add constraint FK_USUARIO_RELATIONS_COMISION foreign key (COMISION_ID)
      references COMISION (COMISION_ID)
      on delete restrict on update restrict;

