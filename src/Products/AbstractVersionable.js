'use strict';

class AbstractVersionable {
  constructor (obj) {
    this.obj = obj;
  }

  /**
   * Check if object has a version
   * @param obj
   * @returns {*|boolean}
   */
  hasVersion(obj) {
    return obj && typeof obj.version !== 'undefined' && obj.version;
  }

  /**
   * Check if object has an array of versions
   * @returns {*|boolean}
   */
  hasVersions() {
    return this.obj && Array.isArray(this.obj.versions) && this.obj.versions.length > 0;
  }

  /**
   * Find an object's version by name
   * @param versionName
   * @returns {*}
   */
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

  /**
   * Check if version is active
   * @param version
   * @returns {*|boolean}
   */
  isActive(version) {
    return version && version.active === true;
  }

  /**
   * Check if version is valid
   * @param version
   * @returns {boolean}
   */
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

  /**
   * Check if object has a valid version
   * @returns {boolean}
   */
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
