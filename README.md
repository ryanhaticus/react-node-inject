---
description: Inject toasts, modals, and more on the fly - all in React!
---

# react-node-inject

![This is the official documentation for the react-node-inject package located here and the repository located here.](<.gitbook/assets/Group 3.png>)

### Installation

```bash
npm install react-node-inject
pnpm install react-node-inject
```

### Features

* Context Provider for injecting a `ReactNode` into the DOM.
* Ability to remove (uninject) or purge nodes from the page via. an `id` parameter.

### Example

`_app.tsx`

```tsx
import { InjectProvider } from 'react-node-inject';

const App = () => {
  return (
    // This is the level at which injectables will be appended to the DOM.
    <InjectProvider>
      // The rest of the app.
      // May contain <MyReactComponent /> from below or something similar.
    </InjectProvider>
  );
}

export default App;
```

`MyReactComponent.tsx`

```tsx
import { useInject } from 'react-node-inject';

const MyReactComponent = () => {
  { inject } = useInject();

  const handleClick = () => {
    inject(
      // An example of a modal with TailwindCSS
      // You can also inject a custom <Modal /> component you have, etc.
      <div className='absolute min-h-screen flex items-center justify-center'>
        <div className='border bg-white shadow px-8 py-4'>
          This modal is injected when the button is clicked!
        </div>
      </div>
    );
  }

  return (
    <button onClick={handleClick}>Click me</button>
  )
}

export default MyReactComponent;
```

### The Problem We're Solving

Instead of loading a modal with an empty state, you can "inject" components on the fly into the DOM. This way, the client isn't seeing any content they shouldn't to begin with and you can have multiple instances of modals, toasts, etc.\
\
In other words, you'll never do this again:

`BadModal.tsx`

```tsx
interface IBadModalProps {
  message: string;
}

// This is an example of what bad code looks like.
// Don't do this!
const BadModal = ({ message }: IBadModalProps) => {
  // Preventing the modal from showing if the message doesn't exist.
  if(message === '') {
    return null;
  }

  return (
    // The modal when a message exists.
  )
}

export default BadModal;
```

`BadForm.tsx`

```tsx
import { Fragment } from 'react';

// This is an example of what bad code looks like.
// Don't do this!
const BadForm = () => {
  const [message, setMessage] = useState('');

  const handleClick = () => {
    setMessage('You clicked the button!')
  }

  return (
    <Fragment>
      {/* We're trying to avoid this: */}
      <BadModal message={message} />

      <button onClick={handleClick}>Submit</button>
    </Fragment>
  )
}

export default BadForm;
```

Instead, you can start doing this:

`GoodModal.tsx`

```tsx
interface IGoodModalProps {
  message: string;
}

const GoodModal = ({ message }: IGoodModalProps) => {
  return (
    // The modal - the message is guarenteed to be here.
  )
}

export default GoodModal;
```

`GoodForm.tsx`

```tsx
import { inject } from 'react-node-inject'

const GoodForm = () => {
  const handleClick = () => {
    // An example of when you can inject a modal.
    inject(<GoodModal message='You clicked the button!' />);
  }

  return (
    <button onClick={handleClick}>Submit</button>
  )
}

export default GoodForm;
```

### Inject Context

```typescript
interface IInjectContext {
  // Inject a ReactNode into the DOM with an optional id
  inject: (node: ReactNode, id?: string) => void;

  // If an injected ReactNode has an id, remove it from the DOM.
  uninject: (id: string) => void;

  // Purge all injected ReactNode components from the DOM.
  purge: () => void;

  // An array of injectables (contains id: string and node: ReactNode properties)
  injected: Injectable[];
}
```

### Contributing

At the moment, this repository is maintained by a student at Iowa State University. If you'd like to contribute, please fork this repository, make your changes, and then send in a pull request. Please respect the current `.prettierrc` configuration - thank you!
