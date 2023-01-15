export const mockValidation = (either?: any, value?: any) => ({
  validate: jest.fn(() => either(value)),
})
