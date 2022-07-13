import { Fragment, ReactNode, useState } from 'react';

import { Injectable } from './types/Injectable';
import { InjectContext } from './InjectContext';

interface IInjectProvider {
  children: ReactNode;
}

export const InjectProvider = ({ children }: IInjectProvider) => {
  const [injected, setInjected] = useState<Injectable[]>([]);

  const inject = (node: ReactNode, id?: string) => {
    const exists = injected.find((i) => i.id === id);

    if (id && exists) {
      throw new Error(`Injectable with id ${id} already exists.`);
    }

    setInjected([...injected, { node, id }]);
  };

  const uninject = (id: string) => {
    const injectable = injected.find((i) => i.id === id);

    if (!injectable) {
      throw new Error(`Injectable with id ${id} does not exist.`);
    }

    setInjected(injected.filter((i) => i.id !== id));
  };

  const purge = () => {
    setInjected([]);
  };

  return (
    <InjectContext.Provider value={{ inject, uninject, purge, injected }}>
      {injected.map(({ node }, index) => (
        <Fragment key={index}>{node}</Fragment>
      ))}
      {children}
    </InjectContext.Provider>
  );
};
