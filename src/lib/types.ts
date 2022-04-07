import { DynamicModule, ValueProvider, FactoryProvider } from '@nestjs/common';

export type AsyncModuleFactoryProvider<T> =
  Omit<FactoryProvider<T>, 'provide'>
  & Pick<DynamicModule, 'imports'>;

export type AsyncModuleValueProvider<T> = Omit<ValueProvider<T>, 'provide'>;

export type AsyncModuleProvider<T> =
  | AsyncModuleFactoryProvider<T>
  | AsyncModuleValueProvider<T>;

