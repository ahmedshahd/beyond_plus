import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { GraphQLModule } from '@nestjs/graphql';
import { PrismaService } from './prisma.service';
import { ConfigModule } from '@nestjs/config';
import { ContactUsModule } from './contact-us/contact-us.module';
import { LearnIconModule } from './learn-icon/learn-icon.module';
import { PrivacyPolicyModule } from './privacy-policy/privacy-policy.module';
import { FaqModule } from './faq/faq.module';
import { LabelModule } from './label/label.module';
import { TermsAndConditionsModule } from './terms-and-conditions/terms-and-conditions.module';
import { UserModule } from './user/user.module';
import { AddressModule } from './address/address.module';
import { NotificationModule } from './notification/notification.module';
import { KeycloakModule } from './keycloak/keycloak.module';
import { APP_GUARD } from '@nestjs/core';
import {
  AuthGuard,
  KeycloakConnectModule,
  ResourceGuard,
  RoleGuard,
} from 'nest-keycloak-connect';
import { KeycloakConfigService } from './keycloak/config/keycloak.config.service';
import { WelcomeScreenModule } from './welcome-screen/welcome-screen.module';
import { LineOfBusinessModule } from './line-of-business/line-of-business.module';
import { GraphQlKeycloakAuthGuard } from './keycloak/guard/graphql-auth-guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    KeycloakConnectModule.registerAsync({
      useExisting: KeycloakConfigService,
      imports: [KeycloakModule],
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: () => ({
        typePaths: ['./**/*.graphql'],
        definitions: {
          path: join(process.cwd(), 'src/graphql.ts'),
          outputAs: 'class',
        },
        context: ({ req }) => ({ req }),
        playground: process.env.NODE_ENV === 'production' ? true : false,
        introspection: true,
        csrfPrevention: true,
        cache: 'bounded',
        plugins: [
          process.env.NODE_ENV !== 'production'
            ? ApolloServerPluginLandingPageLocalDefault()
            : {},
        ],
      }),
    }),
    KeycloakModule,
    ContactUsModule,
    LearnIconModule,
    PrivacyPolicyModule,
    FaqModule,
    LabelModule,
    TermsAndConditionsModule,
    UserModule,
    AddressModule,
    NotificationModule,
    WelcomeScreenModule,
    LineOfBusinessModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: GraphQlKeycloakAuthGuard, // instead of using AuthGuard
    },
    {
      provide: APP_GUARD,
      useClass: ResourceGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class AppModule {}
