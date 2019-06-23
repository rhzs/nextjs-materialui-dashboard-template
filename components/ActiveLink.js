import React, { Children } from 'react';
import { withRouter } from 'next/router';
import classNames from 'classnames';

const ActiveLink = ({
  router,
  children,
  href,
  activeClassName,
  ...otherProps }) => {
  const onlyChild = () => (<React.Fragment>{children}</React.Fragment>)
  const child = Children.only(onlyChild());

  const className = classNames(child.props.className, {
    [activeClassName]: router.pathname === href && activeClassName
  });

  return (<a href={href} {...otherProps}>
    {React.cloneElement(child, { className })}
  </a>);
};

export default withRouter(ActiveLink);
