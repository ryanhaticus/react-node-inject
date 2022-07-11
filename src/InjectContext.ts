import { createContext, ReactNode, useContext } from 'react';
import { Injectable } from './types/Injectable';

interface IInjectContext {
  inject: (node: ReactNode, id?: string) => void;
  uninject: (id: string) => void;
  purge: () => void;
  injected: Injectable[];
}

export const InjectContext = createContext<IInjectContext>(null as any);

export const useInject = () => useContext<IInjectContext>(InjectContext);
