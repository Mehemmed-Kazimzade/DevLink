import Typography, {type TypographyProps } from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

interface RsTypographyProps extends Omit<TypographyProps, 'fontSize'> {
  fontWeight?: TypographyProps['fontWeight']; // make optional, default to 'normal'
  lg: string | number;
  xs: string | number;
  text: string;
}

export default function RsTypography({ fontWeight = "normal", lg, xs, text, ...rest }: RsTypographyProps) {
    const theme = useTheme();
    const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));

    return (
        <Typography fontSize={ isLargeScreen ? lg : xs } fontWeight={fontWeight} {...rest} >
            {text}
        </Typography>
    )
}
