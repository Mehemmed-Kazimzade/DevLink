import Typography, {type TypographyProps } from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

interface RsTypographyProps extends Omit<TypographyProps, 'fontSize'> {
  fontWeight?: TypographyProps['fontWeight']; // make optional, default to 'normal'
  lg: string | number;
  xs: string | number;
  text: string;
}

export default function RsTypography({ fontWeight = "normal", lg, xs, text, ...rest }: RsTypographyProps) {
    const isLargeScreen = useMediaQuery("(min-width: 570px)");

    return (
        <Typography fontSize={ isLargeScreen ? lg : xs } fontWeight={fontWeight} {...rest} >
            {text}
        </Typography>
    )
}
