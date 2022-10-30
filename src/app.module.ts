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
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
