import { internalIpV4 } from 'internal-ip'

const IsProd = process.env.NODE_ENV === 'production'

export async function getAssetPrefix() {
  let internalHost: string = '127.0.0.1'

  if (!IsProd)
    internalHost = await internalIpV4() ?? '127.0.0.1'

  return IsProd ? undefined : `http://${internalHost}:3000`
}
