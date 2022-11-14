import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { KeycloakAuthUser } from './keycloak-auth-user';
import * as querystring from 'querystring';
import { IKeycloakUser } from '../interfaces/keycloak-user.interface';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
@Injectable()
export class KeycloakAuthService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async authorize(accessToken: string): Promise<KeycloakAuthUser> {
    try {
      const response = await lastValueFrom(
        this.httpService.request({
          method: 'post',
          url: `${this.configService.get<string>(
            'KEYCLOAK_BASE_URL',
          )}/realms/${this.configService.get<string>(
            'KEYCLOAK_REALM_NAME',
          )}/protocol/openid-connect/token/introspect`,
          headers: {
            'Content-type': 'application/x-www-form-urlencoded',
          },
          data: new URLSearchParams({
            token: accessToken,
            client_id: this.configService.get<string>('KEYCLOAK_CLIENT_ID'),
            client_secret: this.configService.get<string>(
              'KEYCLOAK_CLIENT_SECRET',
            ),
          }),
        }),
      );

      if (!response?.data) {
        throw new HttpException(
          'Sorry, Invalid access token',
          HttpStatus.UNAUTHORIZED,
        );
      }

      if (!response?.data?.active) {
        throw new HttpException(
          'Sorry, User is disabled',
          HttpStatus.UNAUTHORIZED,
        );
      }

      return response.data; //new KeycloakAuthUser(response.data);
    } catch (error) {
      throw new HttpException(
        error?.response?.data?.errorMessage || error.message,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async registerUser(newUser: IKeycloakUser): Promise<IKeycloakUser> {
    try {
      const adminAccessToken = await this.getAdminAccessToken();

      await lastValueFrom(
        this.httpService.request({
          method: 'post',
          url: `${this.configService.get<string>(
            'KEYCLOAK_BASE_URL',
          )}/admin/realms/${this.configService.get<string>(
            'KEYCLOAK_REALM_NAME',
          )}/users`,
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${adminAccessToken}`,
          },
          data: newUser,
        }),
      ); // not retreive user data

      const response = await lastValueFrom(
        this.httpService.request({
          method: 'get',
          url: `${this.configService.get<string>(
            'KEYCLOAK_BASE_URL',
          )}/admin/realms/${this.configService.get<string>(
            'KEYCLOAK_REALM_NAME',
          )}/users`,
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${adminAccessToken}`,
          },
          params: { email: newUser['email'] },
        }),
      );

      return response?.data[0];
    } catch (error) {
      throw new HttpException(
        error?.response?.data?.errorMessage || error.message,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findUserByEmail(email: string): Promise<IKeycloakUser> {
    try {
      const adminAccessToken = await this.getAdminAccessToken();

      const response = await lastValueFrom(
        this.httpService.request({
          method: 'get',
          url: `${this.configService.get<string>(
            'KEYCLOAK_BASE_URL',
          )}/admin/realms/${this.configService.get<string>(
            'KEYCLOAK_REALM_NAME',
          )}/users`,
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${adminAccessToken}`,
          },
          params: { email },
        }),
      );

      return response?.data[0];
    } catch (error) {
      throw new HttpException(
        error?.response?.data?.errorMessage || error.message,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async resetPassword(user, passwordObj, isForgetPassword): Promise<void> {
    try {
      if (!isForgetPassword) {
        try {
          await lastValueFrom(
            this.httpService.request({
              method: 'post',
              url: `${this.configService.get<string>(
                'KEYCLOAK_BASE_URL',
              )}/realms/${this.configService.get<string>(
                'KEYCLOAK_REALM_NAME',
              )}/protocol/openid-connect/token`,
              headers: {
                'Content-type': 'application/x-www-form-urlencoded',
              },
              data: new URLSearchParams({
                client_secret: this.configService.get<string>(
                  'KEYCLOAK_CLIENT_SECRET',
                ),
                client_id: this.configService.get<string>('KEYCLOAK_CLIENT_ID'),
                grant_type: 'password',
                username: user['username'],
                password: passwordObj['old_password'],
              }),
            }),
          );
        } catch (error) {
          throw new HttpException(
            'incorrect old password',
            HttpStatus.BAD_REQUEST,
          );
        }
      }

      const adminAccessToken = await this.getAdminAccessToken();

      await lastValueFrom(
        this.httpService.request({
          method: 'put',
          url: `${this.configService.get<string>(
            'KEYCLOAK_BASE_URL',
          )}/admin/realms/${this.configService.get<string>(
            'KEYCLOAK_REALM_NAME',
          )}/users/${user['id']}/reset-password`,
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${adminAccessToken}`,
          },
          data: {
            type: 'password',
            temporary: false,
            value: passwordObj['new_password'],
          },
        }),
      );
    } catch (error) {
      throw new HttpException(
        error?.response?.data?.errorMessage || error.message,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async deleteUserById(id: string): Promise<void> {
    try {
      const adminAccessToken = await this.getAdminAccessToken();
      await lastValueFrom(
        this.httpService.request({
          method: 'delete',
          url: `${this.configService.get<string>(
            'KEYCLOAK_BASE_URL',
          )}/admin/realms/${this.configService.get<string>(
            'KEYCLOAK_REALM_NAME',
          )}/users`,
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${adminAccessToken}`,
          },
          params: { id },
        }),
      );
    } catch (error) {
      throw new HttpException(
        error?.response?.data?.errorMessage || error.message,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async updateUser(id: string, data: IKeycloakUser): Promise<void> {
    try {
      const adminAccessToken = await this.getAdminAccessToken();

      await lastValueFrom(
        this.httpService.request({
          method: 'put',
          url: `${this.configService.get<string>(
            'KEYCLOAK_BASE_URL',
          )}/admin/realms/${this.configService.get<string>(
            'KEYCLOAK_REALM_NAME',
          )}/users/${id}`,
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${adminAccessToken}`,
          },
          data: data,
        }),
      );
    } catch (error) {
      throw new HttpException(
        error?.response?.data?.errorMessage || error.message,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getAdminAccessToken(): Promise<string> {
    try {
      const response = await lastValueFrom(
        this.httpService.request({
          method: 'post',
          url: `${this.configService.get<string>(
            'KEYCLOAK_BASE_URL',
          )}/realms/${this.configService.get<string>(
            'KEYCLOAK_REALM_NAME',
          )}/protocol/openid-connect/token`,
          headers: {
            'Content-type': 'application/x-www-form-urlencoded',
          },
          data: new URLSearchParams({
            client_id: this.configService.get<string>('KEYCLOAK_CLIENT_ID'),
            client_secret: this.configService.get<string>(
              'KEYCLOAK_CLIENT_SECRET',
            ),
            grant_type: 'client_credentials',
          }),
        }),
      );

      if (!response?.data?.access_token) {
        throw new HttpException(
          'sorry, wrong keycloak admin credentials',
          HttpStatus.UNAUTHORIZED,
        );
      }

      return response.data.access_token;
    } catch (error) {
      throw new HttpException(
        error?.response?.data?.errorMessage || error.message,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
