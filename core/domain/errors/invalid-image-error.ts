export class InvalidImageError extends Error {
  constructor() {
    super('Imagem inválida, envie apenas imagens do tipo .jpg ou .png')
    this.name = 'InvalidImageError'
  }
}
