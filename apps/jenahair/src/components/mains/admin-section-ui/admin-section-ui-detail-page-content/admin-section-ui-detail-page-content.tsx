'use client';

import {
  Button,
  Group,
  Modal,
  NumberInput,
  Paper,
  Select,
  Stack,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import classes from './admin-section-ui-detail-page-content.module.scss';
import { JSONEditor } from '@vinaup/ui/admin';
import { use, useState, useCallback } from 'react';
import {
  createSectionUIActionPrivate,
  updateSectionUIActionPrivate,
  deleteSectionUIActionPrivate,
} from '@/actions/section-ui-action';
import { getSectionUICredentialsByCodeActionPrivate } from '@/actions/section-ui-action';
import { ISectionUICredentialsResponse } from '@/interfaces/section-ui-credentials-interface';
import { IDynamicSectionUIResponse } from '@/interfaces/dynamic-section-ui-interface';
import { useDebouncedCallback } from 'use-debounce';
import { useDisclosure } from '@mantine/hooks';

interface AdminSectionUIDetailPageContentProps {
  existingDynamicSectionUIsPromise: Promise<IDynamicSectionUIResponse[]>;
  usedPositionsPromise: Promise<number[]>;
}

export default function AdminSectionUIDetailPageContent({
  existingDynamicSectionUIsPromise,
  usedPositionsPromise,
}: AdminSectionUIDetailPageContentProps) {
  const existingDynamicSectionUIs = use(existingDynamicSectionUIsPromise);
  const usedPositions = use(usedPositionsPromise);

  const [mode, setMode] = useState<'list' | 'create' | 'edit'>('list');
  const [dynamicSectionUI, setDynamicSectionUI] =
    useState<IDynamicSectionUIResponse | null>(null);

  // Template code input
  const [templateCode, setTemplateCode] = useState<string>('');
  const [validatedCredentials, setValidatedCredentials] =
    useState<ISectionUICredentialsResponse | null>(null);
  const [isValidating, setIsValidating] = useState<boolean>(false);

  // Position
  const [position, setPosition] = useState<number | string>('');

  const [propertiesJson, setPropertiesJson] = useState<string>('');
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [guideOpened, { open: openGuide, close: closeGuide }] =
    useDisclosure(false);

  // Validate template code
  const handleValidateTemplateCode = async () => {
    if (!templateCode.trim()) {
      notifications.show({
        title: 'Error',
        message: 'Please enter a template code',
        color: 'red',
      });
      return;
    }

    setIsValidating(true);
    const response = await getSectionUICredentialsByCodeActionPrivate(
      templateCode.trim()
    );

    if (response.success && response.data) {
      setValidatedCredentials(response.data);
      notifications.show({
        message: 'Template found!',
        color: 'green',
        position: 'top-right',
      });
    } else {
      setValidatedCredentials(null);
      notifications.show({
        title: 'Invalid Code',
        message: 'Template not found. Please check the code.',
        color: 'red',
      });
    }
    setIsValidating(false);
  };

  // Select an existing DynamicSectionUI to edit
  const handleSelectExisting = useCallback((item: IDynamicSectionUIResponse) => {
    setDynamicSectionUI(item);
    setPosition(item.position);
    setTemplateCode(item.sectionUICredentials?.code || '');
    setValidatedCredentials(item.sectionUICredentials || null);
    setPropertiesJson(
      item.properties ? JSON.stringify(item.properties, null, 2) : ''
    );
    setMode('edit');
  }, []);

  // Handle template change in edit mode
  const handleChangeTemplate = async () => {
    if (!validatedCredentials || !dynamicSectionUI) return;

    setIsLoading(true);
    const response = await updateSectionUIActionPrivate(dynamicSectionUI.id, {
      sectionUICredentialsId: validatedCredentials.id,
      properties: validatedCredentials.propertyFormat,
    });

    if (response.success && response.data) {
      setDynamicSectionUI(response.data);
      setPropertiesJson(
        response.data.properties
          ? JSON.stringify(response.data.properties, null, 2)
          : ''
      );
      notifications.show({
        message: 'Template updated',
        color: 'green',
        position: 'top-right',
      });
    } else {
      notifications.show({
        title: 'Error',
        message: response.error || 'Failed to update template',
        color: 'red',
      });
    }
    setIsLoading(false);
  };

  // Create new DynamicSectionUI
  const handleCreateDynamicSectionUI = async () => {
    if (!validatedCredentials) {
      notifications.show({
        title: 'Error',
        message: 'Please validate a template code first',
        color: 'red',
      });
      return;
    }

    const posNum = typeof position === 'string' ? parseInt(position) : position;
    if (!posNum || posNum < 1) {
      notifications.show({
        title: 'Error',
        message: 'Please enter a valid position (>= 1)',
        color: 'red',
      });
      return;
    }

    if (usedPositions.includes(posNum)) {
      notifications.show({
        title: 'Error',
        message: `Position ${posNum} is already used`,
        color: 'red',
      });
      return;
    }

    setIsLoading(true);
    const response = await createSectionUIActionPrivate({
      position: posNum,
      sectionUICredentialsId: validatedCredentials.id,
      properties: validatedCredentials.propertyFormat,
    });

    if (response.success && response.data) {
      setDynamicSectionUI(response.data);
      setPropertiesJson(
        response.data.properties
          ? JSON.stringify(response.data.properties, null, 2)
          : ''
      );
      setMode('edit');
      notifications.show({
        message: 'Dynamic Section UI created',
        color: 'green',
        position: 'top-right',
      });
    } else {
      notifications.show({
        title: 'Error',
        message: response.error || 'Failed to create',
        color: 'red',
      });
    }
    setIsLoading(false);
  };

  const handleUpdateProperties = useDebouncedCallback(async (newJson: string) => {
    if (!dynamicSectionUI) return;

    try {
      const parsed = newJson.trim() ? JSON.parse(newJson) : null;
      await updateSectionUIActionPrivate(dynamicSectionUI.id, {
        properties: parsed,
      });
      notifications.show({
        message: 'Properties saved',
        color: 'green',
        position: 'top-right',
        autoClose: 900,
      });
    } catch {
      notifications.show({
        title: 'Invalid JSON',
        message: 'Properties must be valid JSON',
        color: 'red',
      });
    }
    setIsSaving(false);
  }, 1500);

  const handleUpdatePosition = async (newPosition: string | null) => {
    if (!dynamicSectionUI || !newPosition) return;

    const posNum = parseInt(newPosition);
    if (posNum === dynamicSectionUI.position) return;

    if (usedPositions.includes(posNum)) {
      notifications.show({
        title: 'Error',
        message: `Position ${posNum} is already used`,
        color: 'red',
      });
      return;
    }

    setIsLoading(true);
    const response = await updateSectionUIActionPrivate(dynamicSectionUI.id, {
      position: posNum,
    });

    if (response.success && response.data) {
      setDynamicSectionUI(response.data);
      setPosition(response.data.position);
      notifications.show({
        message: 'Position updated',
        color: 'green',
        position: 'top-right',
      });
    } else {
      notifications.show({
        title: 'Error',
        message: response.error || 'Failed to update position',
        color: 'red',
      });
    }
    setIsLoading(false);
  };

  const handleBackToList = () => {
    setMode('list');
    setDynamicSectionUI(null);
    setValidatedCredentials(null);
    setTemplateCode('');
    setPosition('');
    setPropertiesJson('');
  };

  const handleDelete = async () => {
    if (!dynamicSectionUI) return;

    if (!confirm('Are you sure you want to delete this item?')) return;

    setIsLoading(true);
    const response = await deleteSectionUIActionPrivate(dynamicSectionUI.id);

    if (response.success) {
      notifications.show({
        message: 'Deleted successfully',
        color: 'green',
        position: 'top-right',
      });
      handleBackToList();
    } else {
      notifications.show({
        title: 'Error',
        message: response.error || 'Failed to delete',
        color: 'red',
      });
    }
    setIsLoading(false);
  };

  const handleShowCreateForm = () => {
    setMode('create');
    setDynamicSectionUI(null);
    setValidatedCredentials(null);
    setTemplateCode('');
    setPosition('');
    setPropertiesJson('');
  };

  return (
    <div className={classes.sectionUIDetailRoot}>
      <Paper p="md" radius="md" classNames={{ root: classes.paperBlock }}>
        <Stack gap="md">
          <Group justify="space-between">
            <Group gap="md">
              <Text size="xl" fw={600}>
                Section UI
              </Text>
              {mode === 'edit' && dynamicSectionUI && (
                <Select
                  value={dynamicSectionUI.position.toString()}
                  onChange={handleUpdatePosition}
                  data={Array.from({ length: 50 }, (_, i) => i + 1).map((pos) => ({
                    value: pos.toString(),
                    label: pos.toString(),
                    disabled:
                      usedPositions.includes(pos) &&
                      pos !== dynamicSectionUI.position,
                  }))}
                  size="sm"
                  className={classes.positionSelect}
                  disabled={isLoading}
                />
              )}
            </Group>
            <Group gap="xs">
              {mode === 'edit' && dynamicSectionUI && (
                <Text
                  size="lg"
                  c="dark.3"
                  className={isSaving ? classes.savingText : classes.savedText}
                >
                  {isSaving ? 'Saving...' : 'Saved'}
                </Text>
              )}
              {mode !== 'list' && (
                <Button onClick={handleBackToList} variant="outline" size="sm">
                  Back
                </Button>
              )}
            </Group>
          </Group>

          {mode === 'list' && (
            // List mode - show existing items
            <Stack gap="md">
              <Group justify="space-between">
                <Text fw={500}>
                  Existing Items ({existingDynamicSectionUIs.length})
                </Text>
                <Button size="sm" onClick={handleShowCreateForm}>
                  + Create New
                </Button>
              </Group>

              {existingDynamicSectionUIs.length === 0 ? (
                <Paper p="sm" withBorder bg="gray.0">
                  <Text size="sm" c="dimmed" ta="center">
                    No items yet. Click &quot;Create New&quot; to add one.
                  </Text>
                </Paper>
              ) : (
                <Stack gap="xs">
                  {existingDynamicSectionUIs.map((item) => (
                    <Paper
                      key={item.id}
                      p="sm"
                      withBorder
                      className={classes.listItem}
                      onClick={() => handleSelectExisting(item)}
                    >
                      <Group justify="space-between">
                        <Stack gap={2}>
                          <Text fw={500}>Position: {item.position}</Text>
                          <Text size="xs" c="dimmed">
                            Template: {item.sectionUICredentials?.code || 'None'}
                          </Text>
                        </Stack>
                        <Button size="xs" variant="light">
                          Edit
                        </Button>
                      </Group>
                    </Paper>
                  ))}
                </Stack>
              )}
            </Stack>
          )}

          {mode === 'create' && (
            // Create form
            <Paper p="md" withBorder bg="gray.0">
              <Stack gap="md">
                {/* Template Code Input */}
                <Stack gap="xs">
                  <Text size="md" fw={500}>
                    Template Code
                  </Text>
                  <Group>
                    <TextInput
                      size="md"
                      placeholder="Enter template code..."
                      value={templateCode}
                      onChange={(e) => {
                        setTemplateCode(e.currentTarget.value);
                        setValidatedCredentials(null);
                      }}
                      className={classes.templateInput}
                    />
                    <Button
                      onClick={handleValidateTemplateCode}
                      loading={isValidating}
                      variant="outline"
                      size="md"
                    >
                      Validate
                    </Button>
                  </Group>
                  {validatedCredentials && (
                    <Paper p="sm" withBorder bg="green.0">
                      <Group justify="space-between">
                        <Text size="sm" c="green.8" fw={500}>
                          ✓ Template Valid
                        </Text>
                        <Button variant="outline" size="xs" onClick={openGuide}>
                          View Guide
                        </Button>
                      </Group>
                    </Paper>
                  )}
                </Stack>

                {/* Position Input */}
                <NumberInput
                  label="Position"
                  description={`Used positions: ${usedPositions.length > 0 ? usedPositions.join(', ') : 'none'}`}
                  placeholder="Enter position number..."
                  value={position}
                  onChange={setPosition}
                  min={1}
                  required
                  size="md"
                />

                <Button
                  onClick={handleCreateDynamicSectionUI}
                  loading={isLoading}
                  disabled={!validatedCredentials || !position}
                >
                  Create
                </Button>
              </Stack>
            </Paper>
          )}

          {mode === 'edit' && dynamicSectionUI && (
            // Edit form
            <Stack gap="md">
              {/* Template Change Section */}
              <Stack gap="xs">
                <Text size="md" fw={500}>
                  Template Code
                </Text>
                <Group>
                  <TextInput
                    size="md"
                    placeholder="Enter new template code..."
                    value={templateCode}
                    onChange={(e) => {
                      setTemplateCode(e.currentTarget.value);
                      if (
                        e.currentTarget.value !==
                        dynamicSectionUI.sectionUICredentials?.code
                      ) {
                        setValidatedCredentials(null);
                      }
                    }}
                    className={classes.templateInput}
                  />
                  <Button
                    onClick={handleValidateTemplateCode}
                    loading={isValidating}
                    variant="outline"
                    size="md"
                  >
                    Validate
                  </Button>
                  {validatedCredentials &&
                    validatedCredentials.id !==
                      dynamicSectionUI.sectionUICredentialsId && (
                      <Button
                        onClick={handleChangeTemplate}
                        loading={isLoading}
                        color="green"
                        size="sm"
                      >
                        Apply
                      </Button>
                    )}
                </Group>
                {validatedCredentials && (
                  <Paper p="sm" withBorder bg="green.0">
                    <Group justify="space-between">
                      <Text size="sm" c="green.8" fw={500}>
                        ✓ Current Template: {validatedCredentials.code}
                      </Text>
                      <Button variant="outline" size="xs" onClick={openGuide}>
                        View Guide
                      </Button>
                    </Group>
                  </Paper>
                )}
              </Stack>

              <Stack gap="xs">
                <Text>Properties (JSON)</Text>
                <JSONEditor
                  value={propertiesJson}
                  onChange={(newValue) => {
                    setPropertiesJson(newValue);
                    setIsSaving(true);
                    handleUpdateProperties(newValue);
                  }}
                  height="500px"
                />
              </Stack>

              <Group justify="flex-end" mt="md">
                <Button
                  color="red"
                  variant="outline"
                  onClick={handleDelete}
                  loading={isLoading}
                >
                  Delete
                </Button>
              </Group>
            </Stack>
          )}
        </Stack>
      </Paper>

      <Modal
        opened={guideOpened}
        onClose={closeGuide}
        title="Property Format Guide"
        size="lg"
      >
        <Stack gap="md">
          <Text size="sm" c="dimmed">
            Copy the JSON schema below and use it as a template for your properties
            configuration.
          </Text>
          <Textarea
            readOnly
            autosize
            minRows={10}
            maxRows={20}
            value={
              validatedCredentials
                ? JSON.stringify(validatedCredentials.propertyFormat, null, 2)
                : ''
            }
            styles={{ input: { fontFamily: 'monospace', fontSize: '12px' } }}
          />
          <Button
            onClick={() => {
              if (validatedCredentials) {
                navigator.clipboard.writeText(
                  JSON.stringify(validatedCredentials.propertyFormat, null, 2)
                );
                notifications.show({
                  message: 'Copied to clipboard',
                  color: 'green',
                  position: 'top-right',
                });
              }
            }}
          >
            Copy to Clipboard
          </Button>
        </Stack>
      </Modal>
    </div>
  );
}
