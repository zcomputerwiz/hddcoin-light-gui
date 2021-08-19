import React from 'react';
import { Trans } from '@lingui/macro';
import { Amount, Form, AlertDialog, Back, Card, Flex } from '@chia/core';
import {
  Typography,
  Button,
  Box,
  TextField,
  Tooltip,
} from '@material-ui/core';
import {
  createState,
} from '../../../modules/createWallet';
import { useDispatch } from 'react-redux';
import { create_did_action } from '../../../modules/message';
import { chia_to_mojo } from '../../../util/chia';
import { openDialog } from '../../../modules/dialog';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { Help as HelpIcon } from '@material-ui/icons';

export default function WalletDIDCreate() {
  const dispatch = useDispatch();
  const methods = useForm();
  const { handleSubmit, control } = methods;
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'backup_dids',
  });

  const onSubmit = (data) => {
    const didArray = data.backup_dids?.map((item) => item.backupid) ?? [];
    let uniqDidArray = Array.from(new Set(didArray));
    uniqDidArray = uniqDidArray.filter(item => item !== "")
    let amount_val = chia_to_mojo(data.amount);
    if (
      amount_val === '' ||
      Number(amount_val) === 0 ||
      !Number(amount_val) ||
      isNaN(Number(amount_val))
    ) {
      dispatch(
        openDialog(
          <AlertDialog>
            <Trans>Please enter a valid numeric amount.</Trans>
          </AlertDialog>
        ),
      );
      return;
    }
    if (
      (amount_val) % 2 != 0
    ) {
      dispatch(
        openDialog(
          <AlertDialog>
            <Trans>Amount must be an even amount.</Trans>
          </AlertDialog>
        ),
      );
      return;
    }
    let num_of_backup_ids_needed = data.num_needed;
    if (
      num_of_backup_ids_needed === '' ||
      isNaN(Number(num_of_backup_ids_needed))
    ) {
      dispatch(
        openDialog(
          <AlertDialog>
            <Trans>Please enter a valid integer of 0 or greater for the number of Backup IDs needed for recovery.</Trans>
          </AlertDialog>
        ),
      );
      return;
    }
    if (
      num_of_backup_ids_needed > uniqDidArray.length
    )
    {
      dispatch(
        openDialog(
          <AlertDialog>
            <Trans>The number of Backup IDs needed for recovery cannot exceed the number of Backup IDs added.</Trans>
          </AlertDialog>
        ),
      );
      return;
    }
    const amount_plus = amount_val + 1;
    dispatch(createState(true, true));
    dispatch(create_did_action(amount_plus, uniqDidArray, num_of_backup_ids_needed));
  };

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Flex flexDirection="column" gap={3}>
        <Back variant="h5">
          <Trans>Create Distributed Identity Wallet</Trans>
        </Back>
        <Card>
          <Flex flexDirection="column" gap={3}>
            <Flex flexDirection="column" gap={1}>
              <Flex alignItems="center" gap={1}>
                <Typography variant="subtitle1">
                  Enter amount
                </Typography>
                <Tooltip title="The amount of Chia you enter must correspond to an even amount of mojos. One additional mojo will be added to the total amount for security purposes.">
                  <HelpIcon style={{ color: '#c8c8c8', fontSize: 12 }} />
                </Tooltip>
                :
              </Flex>
              <Flex alignItems="center" gap={1}>
                <Flex flexGrow={1}>
                  <Amount
                    name="amount"
                    variant="outlined"
                    defaultValue=""
                    fullWidth
                  />
                </Flex>
                <Flex display="flex" gap={1} alignItems="center">
                  <Typography variant="subtitle1">
                    + 1 mojo
                  </Typography>
                  <Tooltip title="This additional mojo will be added to the total amount for security purposes.">
                    <HelpIcon style={{ color: '#c8c8c8', fontSize: 12 }} />
                  </Tooltip>
                </Flex>
              </Flex>
            </Flex>
            <Flex flexDirection="column" gap={1}>
              <Box display="flex">
                <Flex alignItems="stretch">
                  <Typography variant="subtitle1">
                    Enter number of Backup IDs needed for recovery:
                  </Typography>
                  <Tooltip title="This number must be an integer greater than or equal to 0. It cannot exceed the number of Backup IDs added. You will be able to change this number as well as your list of Backup IDs.">
                    <HelpIcon style={{ color: '#c8c8c8', fontSize: 12 }} />
                  </Tooltip>
                </Flex>
              </Box>
              <Flex flexDirection="row" justifyContent="space-between">
                <Box flexGrow={6}>
                  <Controller
                    as={TextField}
                    name="num_needed"
                    control={control}
                    label="Number of Backup IDs needed for recovery"
                    variant="outlined"
                    fullWidth
                    defaultValue=""
                  />
                </Box>
              </Flex>
            </Flex>
            <Flex flexDirection="column" gap={1}>
              <Box display="flex">
                <Box flexGrow={6}>
                  <Typography variant="subtitle1">
                    Add Backup IDs (optional):
                  </Typography>
                </Box>
              </Box>
              {fields.map((item, index) => (
                <Flex alignItems="stretch" key={item.id}>
                  <Box flexGrow={1}>
                    <Controller
                      as={TextField}
                      name={`backup_dids[${index}].backupid`}
                      control={control}
                      defaultValue=""
                      label="Backup ID"
                      variant="outlined"
                      fullWidth
                      color="secondary"
                    />
                  </Box>
                  <Button
                    onClick={() => remove(index)}
                    variant="contained"
                  >
                    <Trans>Delete</Trans>
                  </Button>
                </Flex>
              ))}
              <Box>
                <Button
                  onClick={() => {
                    append({ backupid: 'Backup ID' });
                  }}
                  variant="contained"
                >
                  <Trans>Add Backup ID</Trans>
                </Button>
              </Box>
            </Flex>
          </Flex>
        </Card>
        <Box>
          <Button
            type="submit"
            variant="contained"
            color="primary"
          >
            <Trans>Create</Trans>
          </Button>
        </Box>
      </Flex>
    </Form>
  );
}
