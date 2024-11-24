import React from "react";
import classNames from "classnames";

import { LoginForm } from "@/forms/LoginForm";
import { RegisterForm } from "@/forms/RegisterForm";

import { Lock } from "iconoir-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Grid from "@/components/Grid/Grid";
import AuthTab from "@/components/AuthTab/AuthTab";

import useMobile from "@/hooks/useMobile";

import styles from "./styles.module.scss";

interface Props {}

const AuthPage: React.FC<Props> = () => {
  const isMobile = useMobile();

  return (
    <div className={styles["login-page__form__wrapper"]}>
      <Grid>
        <div
          className={classNames(
            styles["login-page__form__container"],
            { "start-4 col-6": !isMobile },
            { "start-1 col-4": isMobile }
          )}
        >
          <div className={styles["login-page__form__container__div"]}>
            <h1 className={styles["login-page__form__container__title"]}>
              Employee portal
            </h1>
            <Lock height={40} width={40} color="white" />
          </div>

          <Tabs defaultValue="login">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Log In</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <AuthTab
                title="Log In"
                description="Enter your login details to continue."
                form={<LoginForm role="employee" />}
              />
            </TabsContent>
            <TabsContent value="register">
              <AuthTab
                title="Register"
                description="Create a new account on our website."
                form={<RegisterForm role="employee" />}
              />
            </TabsContent>
          </Tabs>
        </div>
      </Grid>
    </div>
  );
};

export default AuthPage;
