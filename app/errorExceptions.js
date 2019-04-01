BusinessError.prototype = new Error()
InfrastructureError.prototype = new Error()

const BusinessError = (message) => {
    this.message = message
}

const InfrastructureError = (message) => {
    this.message = message
}

module.exports = {
    BusinessError,
    InfrastructureError
}
