import { AbstractDocument } from "../database";
export declare class UserDocument extends AbstractDocument {
  email: string;
  password: string;
  roles?: string[];
}
export declare const UserSchema: import("mongoose").Schema<
  UserDocument,
  import("mongoose").Model<UserDocument, any, any, any, any, any, UserDocument>,
  {},
  {},
  {},
  {},
  import("mongoose").DefaultSchemaOptions,
  UserDocument,
  import("mongoose").Document<
    unknown,
    {},
    UserDocument,
    {
      id: string;
    },
    import("mongoose").DefaultSchemaOptions
  > &
    Omit<
      UserDocument &
        Required<{
          _id: import("mongoose").Types.ObjectId;
        }> & {
          __v: number;
        },
      "id"
    > & {
      id: string;
    },
  {
    email?: import("mongoose").SchemaDefinitionProperty<
      string,
      UserDocument,
      import("mongoose").Document<
        unknown,
        {},
        UserDocument,
        {
          id: string;
        },
        import("mongoose").DefaultSchemaOptions
      > &
        Omit<
          UserDocument &
            Required<{
              _id: import("mongoose").Types.ObjectId;
            }> & {
              __v: number;
            },
          "id"
        > & {
          id: string;
        }
    >;
    password?: import("mongoose").SchemaDefinitionProperty<
      string,
      UserDocument,
      import("mongoose").Document<
        unknown,
        {},
        UserDocument,
        {
          id: string;
        },
        import("mongoose").DefaultSchemaOptions
      > &
        Omit<
          UserDocument &
            Required<{
              _id: import("mongoose").Types.ObjectId;
            }> & {
              __v: number;
            },
          "id"
        > & {
          id: string;
        }
    >;
    roles?: import("mongoose").SchemaDefinitionProperty<
      string[],
      UserDocument,
      import("mongoose").Document<
        unknown,
        {},
        UserDocument,
        {
          id: string;
        },
        import("mongoose").DefaultSchemaOptions
      > &
        Omit<
          UserDocument &
            Required<{
              _id: import("mongoose").Types.ObjectId;
            }> & {
              __v: number;
            },
          "id"
        > & {
          id: string;
        }
    >;
    _id?: import("mongoose").SchemaDefinitionProperty<
      import("mongoose").Types.ObjectId,
      UserDocument,
      import("mongoose").Document<
        unknown,
        {},
        UserDocument,
        {
          id: string;
        },
        import("mongoose").DefaultSchemaOptions
      > &
        Omit<
          UserDocument &
            Required<{
              _id: import("mongoose").Types.ObjectId;
            }> & {
              __v: number;
            },
          "id"
        > & {
          id: string;
        }
    >;
  },
  UserDocument
>;
//# sourceMappingURL=user.schema.d.ts.map
