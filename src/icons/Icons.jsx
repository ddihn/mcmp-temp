import {
  IconHome,
  IconBusinessplan,
  IconUser,
  IconAlarm,
} from "@tabler/icons-react";

const defaultProps = {
  size: 20,
  stroke: 1.5,
};

export const Icons = {
  home: (props) => <IconHome {...defaultProps} {...props} />,
  businessplan: (props) => <IconBusinessplan {...defaultProps} {...props} />,
  user: (props) => <IconUser {...defaultProps} {...props} />,
  alarm: (props) => <IconAlarm {...defaultProps} {...props} />,
};
