import { Icon } from "./Icon";

import "../styles/button.scss";
import { ButtonHTMLAttributes, memo } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  iconName: "action" | "comedy" | "documentary" | "drama" | "horror" | "family";
  selected: boolean;
}

function ButtonComponent({ iconName, title, selected, ...rest }: ButtonProps) {
  return (
    <button
      type="button"
      {...(selected && { className: "selected" })}
      {...rest}
    >
      <Icon name={iconName} color={selected ? "#FAE800" : "#FBFBFB"} />
      {title}
    </button>
  );
}

export const Button = memo(ButtonComponent, (prevProps, nextProps) => {
  const areSameTitle = prevProps.title === nextProps.title;
  const areSameIconName = prevProps.iconName === nextProps.iconName;
  const areSameSelected = prevProps.selected === nextProps.selected;

  const areSameProps = areSameTitle && areSameIconName && areSameSelected;

  return areSameProps;
});
