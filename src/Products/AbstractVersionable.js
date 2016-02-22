'use strict';

class AbstractVersionable {
  constructor (obj) {
    this.obj = obj;
  }

  hasVersion(obj) {
    return obj && typeof obj.version !== 'undefined' && obj.version;
  }

  hasVersions() {
    return this.obj && Array.isArray(this.obj.versions) && this.obj.versions.length > 0;
  }

  findVersion(versionName) {
    if (!versionName || !this.hasVersions()) {
      return;
    }

    for (let v of this.obj.versions) {
      if (v && v.name === versionName) {
        return v;
      }
    }
  }

  isActive(version) {
    return version && version.active === true;
  }

  isValid(version) {
    var start, end,
        now = Date.now();

    if (!version) {
      return false;
    }

    if (version.start) {
      start = new Date(version.start);
    }
    if (version.end) {
      end = new Date(version.end);
    }

    return (!start || start <= now) && (!end || end >= now);
  }

  hasValidVersion() {
    if (!this.hasVersions()) {
      return false;
    }

    for (let v of this.obj.versions) {
      if (this.isActive(v) && this.isValid(v)) {
        return true;
      }
    }

    return false;
  }
}
