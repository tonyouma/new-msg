import { Icon } from '@iconify/react';
import { useState } from 'react';
import { capitalCase } from 'change-case';
import settings2Fill from '@iconify/icons-eva/settings-2-fill';
import roundAccountBox from '@iconify/icons-ic/round-account-box';
import roundPowerSettingsNew from '@iconify/icons-ic/round-power-settings-new';
// material
import {
  Box,
  List,
  Select,
  Divider,
  Popover,
  Tooltip,
  ListItem,
  Typography,
  IconButton,
  ListItemIcon,
  ListItemText
} from '@material-ui/core';
// hooks
import useAuth from '../../../hooks/useAuth';
//
import MyAvatar from '../../MyAvatar';
import BadgeStatus from '../../BadgeStatus';

// ----------------------------------------------------------------------

const STATUS = ['online', 'invisible', 'away'] as const;

export default function ChatAccount() {
  const { user } = useAuth();
  const [open, setOpen] = useState<HTMLDivElement | null>(null);
  const [status, setStatus] = useState<
    'online' | 'away' | 'busy' | 'unread' | 'offline' | 'invisible'
  >('online');

  const handleOpen = (event: React.MouseEvent<HTMLDivElement>) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <Box style={{ position: 'relative' }}>
        <MyAvatar onClick={handleOpen} style={{ cursor: 'pointer', width: 48, height: 48 }} />
        <BadgeStatus status={status} style={{ position: 'absolute', bottom: 2, right: 2 }} />
      </Box>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        <Box
          style={{
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <MyAvatar />

          <Box style={{ marginLeft: 2}}>
            <Typography noWrap variant="subtitle1">
              {user?.displayName}
            </Typography>
            <Typography noWrap variant="body2" style={{ color: 'text.secondary' }}>
              {user?.email}
            </Typography>
          </Box>

          <Tooltip title="Log out">
            <IconButton>
              <Icon icon={roundPowerSettingsNew} width={24} height={24} />
            </IconButton>
          </Tooltip>
        </Box>

        <Divider />

        <List>
          <ListItem disableGutters style={{}}>
            <ListItemIcon>
              <Box
                style={{
                  width: 24,
                  height: 24,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <BadgeStatus status={status} />
              </Box>
            </ListItemIcon>
            <ListItemText>
              <Select
                native
                fullWidth
                disableUnderline
                size="small"
                value={status}
                // onChange={(e) => setStatus(e.target.value)}
               
              >
                {STATUS.map((option) => (
                  <option key={option} value={option}>
                    {capitalCase(option)}
                  </option>
                ))}
              </Select>
            </ListItemText>
          </ListItem>

          <ListItem button disableGutters style={{ }}>
            <ListItemIcon>
              <Icon icon={roundAccountBox} width={24} height={24} />
            </ListItemIcon>
            <ListItemText
              primary="Profile"
              primaryTypographyProps={{
                variant: 'body2'
              }}
            />
          </ListItem>

          <ListItem button disableGutters style={{ }}>
            <ListItemIcon>
              <Icon icon={settings2Fill} width={24} height={24} />
            </ListItemIcon>
            <ListItemText
              primary="Settings"
              primaryTypographyProps={{
                variant: 'body2'
              }}
            />
          </ListItem>
        </List>
      </Popover>
    </>
  );
}
