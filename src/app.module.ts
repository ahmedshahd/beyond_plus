import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { GraphQLModule } from '@nestjs/graphql';
import { PrismaService } from './prisma.service';
import { ContactUsModule } from './admin/contact-us/contact-us.admin.module';
import { LearnIconModule } from './admin/learn-icon/learn-icon.admin.module';
import { FaqModule } from './admin/faq/faq.admin.module';
import { LabelModule } from './admin/label/label.admin.module';
import { TermsAndConditionsModule } from './admin/terms-and-conditions/terms-and-conditions.admin.module';
import { WelcomeScreenAdminModule } from './admin/welcome-screen/welcome-screen.admin.module';
import { LineOfBusinessAdminModule } from './admin/line-of-business/line-of-business.admin.module';
// import { UserClientModule } from './client/user/user.client.module';
import { PrivacyPolicyModule } from './admin/privacy-policy/privacy-policy.admin.module';
import { InsuranceCompanyModule } from './medical-network/insurance-company/insurance-company.module';
import { CountryModule } from './medical-network/country/country.module';
import { CityModule } from './medical-network/city/city.module';
import { AreaModule } from './medical-network/area/area.module';
import { ProviderTypeModule } from './medical-network/provider-type/provider-type.module';
import { ProviderModule } from './medical-network/provider/provider.module';
import { CategoryModule } from './medical-network/category/category.module';
import { SpecialityModule } from './medical-network/speciality/speciality.module';
import { SubSpecialityModule } from './medical-network/sub-speciality/sub-speciality.module';
import { ConfigModule } from '@nestjs/config';
import { ApiKeyMiddleware } from './middlewares/api-key.middleware';
import { CsvUploaderModule } from './csv-uploader/csv-uploader.module';
import { TpaModule } from './medical-network/tpa/tpa.module';
import { CityClientModule } from './client/city/city.client.module';
import { AreaClientModule } from './client/area/area.client.module';
import { UserProfileModule } from './client/user-profile/user-profile.module';
import { UserAddressModule } from './client/user-address/user-address.module';
import { UserInsuranceInfoModule } from './client/user-insurance-info/user-insurance-info.module';
import { S3Module } from './client/S3/uploader.module';
import { SendemailModule } from './client/sendemail/sendemail.module';
import { TutorialVideoModule } from './admin/tutorial-video/tutorial-video.module';
import { WellnessTipsModule } from './client/wellness-tips/wellness-tips.module';
import { HealthCaresModule } from './client/health-care/health-care.module';
import { UserRegistrationTokenModule } from './client/user-registration-token/user-registration-token.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
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
        csrfPrevention: false,
        cache: 'bounded',
        plugins: [
          process.env.NODE_ENV !== 'production'
            ? ApolloServerPluginLandingPageLocalDefault()
            : {},
        ],
      }),
    }),
    ContactUsModule,
    LearnIconModule,
    PrivacyPolicyModule,
    FaqModule,
    LabelModule,
    TermsAndConditionsModule,
    WelcomeScreenAdminModule,
    LineOfBusinessAdminModule,

    WelcomeScreenAdminModule,
    LineOfBusinessAdminModule,
    InsuranceCompanyModule,
    CountryModule,
    CityModule,
    AreaModule,
    ProviderTypeModule,
    ProviderModule,
    CategoryModule,
    SpecialityModule,
    SubSpecialityModule,
    CsvUploaderModule,
    TpaModule,
    CityClientModule,
    AreaClientModule,
    UserProfileModule,
    UserAddressModule,
    UserInsuranceInfoModule,
    S3Module,
    SendemailModule,
    TutorialVideoModule,
    WellnessTipsModule,
    HealthCaresModule,
    UserRegistrationTokenModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ApiKeyMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
