export default function formatISOString(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();

  const diffInMilliseconds = Math.abs(now.getTime() - date.getTime());
  const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);

  if (diffInSeconds < 60) {
    return `${diffInSeconds}s`;
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes}m`;
  } else if (diffInHours < 24) {
    return `${diffInHours}h`;
  } else if (date.getFullYear() === now.getFullYear()) {
    const options: Intl.DateTimeFormatOptions = {
      month: 'long',
      day: 'numeric',
    };
    return date.toLocaleDateString(undefined, options);
  } else {
    const options: Intl.DateTimeFormatOptions = {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    };
    return date.toLocaleDateString(undefined, options);
  }
}
