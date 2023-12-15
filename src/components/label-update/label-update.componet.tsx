import { Component, Fragment, ReactNode, RefObject } from "react";

type LabelUpdatedComponent = {
  children: ReactNode;
  classToToggle: string | undefined;
  value?: unknown;
  _ref: RefObject<HTMLSpanElement>;
};

class LabelUpdate extends Component<LabelUpdatedComponent> {
  togglePriceClass(className: string) {
    if (!this.props._ref.current) return;
    if (!this.props._ref.current.classList) return;

    this.props._ref.current.classList.add(className);
    setTimeout(() => {
      if (
        this.props._ref &&
        this.props._ref.current &&
        this.props._ref.current.classList
      )
        //@ts-ignore
        this.props._ref.current.classList.remove(className);
    }, 300);
  }

  componentDidUpdate(prev: LabelUpdatedComponent) {
    //do not update the class if
    //value has not changed
    if (prev.value && prev.value === this.props.value) return;
    if (this.props.classToToggle)
      this.togglePriceClass(this.props.classToToggle);
  }

  render() {
    const { children } = this.props;
    return <Fragment>{children}</Fragment>;
  }
}

export default LabelUpdate;
