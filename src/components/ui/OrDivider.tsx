import { Box, Typography } from '@mui/material';

export default function OrDivider() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <Box sx={{ flex: 1, height: '1px', backgroundColor: 'grey.700' }} />
      <Typography
        variant="body2"
        sx={{ mx: 2, color: 'grey.600', fontWeight: 500 }}
      >
        or

      </Typography>
      <Box sx={{ flex: 1, height: '1px', backgroundColor: 'grey.700' }} />
    </Box>
  );
}
