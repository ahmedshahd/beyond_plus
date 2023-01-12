import { Module } from '@nestjs/common';
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
import { UserClientModule } from './client/user/user.client.module';
import { PrivacyPolicyModule } from './admin/privacy-policy/privacy-policy.admin.module';
import { AddressClientModule } from './client/address/address.client.module';
import { NotificationClientModule } from './client/notification/notification.client.module';
import { InsuranceCompanyModule } from './medical-network/insurance-company/insurance-company.module';
import { CountryModule } from './medical-network/country/country.module';
import { CityModule } from './medical-network/city/city.module';
import { AreaModule } from './medical-network/area/area.module';
import { ProviderTypeModule } from './medical-network/provider-type/provider-type.module';
import { ProviderModule } from './medical-network/provider/provider.module';
import { CategoryModule } from './medical-network/category/category.module';
import { SpecialityModule } from './medical-network/speciality/speciality.module';
import { SubSpecialityModule } from './medical-network/sub-speciality/sub-speciality.module';
import { UploaderModule } from './medical-network/uploader/uploader.module';
import { BullModule } from '@nestjs/bull';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ApiKeyModule } from './auth/api-key/api-key.module';

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
        csrfPrevention: true,
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
    UserClientModule,
    AddressClientModule,
    NotificationClientModule,
    WelcomeScreenAdminModule,
    LineOfBusinessAdminModule,
    ApiKeyModule,
    InsuranceCompanyModule,
    CountryModule,
    CityModule,
    AreaModule,
    ProviderTypeModule,
    ProviderModule,
    CategoryModule,
    SpecialityModule,
    SubSpecialityModule,
    UploaderModule,
    BullModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        redis: {
          host: configService.get<string>('REDIS_HOST'),
          port: +configService.get<number>('REDIS_PORT'),
          password: configService.get<string>('REDIS_PASSWORD'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
